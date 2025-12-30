import json
import os
import hashlib
import psycopg2
from urllib.parse import parse_qs


def calculate_signature(*args) -> str:
    """Создание MD5 подписи по документации Robokassa"""
    joined = ':'.join(str(arg) for arg in args)
    return hashlib.md5(joined.encode()).hexdigest().upper()


def get_db_connection():
    """Получение подключения к БД"""
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not configured')
    return psycopg2.connect(dsn)


HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/plain'
}


def handler(event: dict, context) -> dict:
    '''
    Result URL вебхук от Robokassa для подтверждения оплаты пополнения баланса.
    После успешной оплаты начисляет средства игроку.
    Returns: OK{InvId} если подпись верна и баланс пополнен
    '''
    method = event.get('httpMethod', 'GET').upper()

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': '', 'isBase64Encoded': False}

    password_2 = os.environ.get('ROBOKASSA_PASSWORD_2')
    if not password_2:
        return {'statusCode': 500, 'headers': HEADERS, 'body': 'Configuration error', 'isBase64Encoded': False}

    # Парсинг параметров из body или query string
    params = {}
    body = event.get('body', '')

    if method == 'POST' and body:
        if event.get('isBase64Encoded', False):
            import base64
            body = base64.b64decode(body).decode('utf-8')
        parsed = parse_qs(body)
        params = {k: v[0] for k, v in parsed.items()}

    if not params:
        params = event.get('queryStringParameters') or {}

    out_sum = params.get('OutSum', params.get('out_summ', ''))
    inv_id = params.get('InvId', params.get('inv_id', ''))
    signature_value = params.get('SignatureValue', params.get('crc', '')).upper()

    if not out_sum or not inv_id or not signature_value:
        return {'statusCode': 400, 'headers': HEADERS, 'body': 'Missing required parameters', 'isBase64Encoded': False}

    # Проверка подписи
    expected_signature = calculate_signature(out_sum, inv_id, password_2)
    if signature_value != expected_signature:
        return {'statusCode': 400, 'headers': HEADERS, 'body': 'Invalid signature', 'isBase64Encoded': False}

    # Обновление статуса заказа и начисление баланса
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT id, order_number, steam_id, amount, status
        FROM orders
        WHERE robokassa_inv_id = %s
    """, (int(inv_id),))

    order = cur.fetchone()

    if not order:
        conn.close()
        return {'statusCode': 404, 'headers': HEADERS, 'body': 'Order not found', 'isBase64Encoded': False}

    order_id, order_number, steam_id, amount, status = order

    # Если уже оплачен, возвращаем OK
    if status == 'paid':
        conn.close()
        return {'statusCode': 200, 'headers': HEADERS, 'body': f'OK{inv_id}', 'isBase64Encoded': False}

    # Обновляем статус заказа
    cur.execute("""
        UPDATE orders
        SET status = 'paid', paid_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
    """, (order_id,))

    # Проверяем существует ли игрок
    cur.execute("SELECT id, balance FROM players WHERE steam_id = %s", (steam_id,))
    player = cur.fetchone()

    amount_coins = int(float(amount))

    if player:
        # Обновляем баланс существующего игрока
        player_id = player[0]
        cur.execute("""
            UPDATE players
            SET balance = balance + %s, total_donated = total_donated + %s, updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
        """, (amount_coins, amount_coins, player_id))
    else:
        # Создаём нового игрока
        cur.execute("""
            INSERT INTO players (steam_id, balance, total_donated)
            VALUES (%s, %s, %s)
            RETURNING id
        """, (steam_id, amount_coins, amount_coins))
        player_id = cur.fetchone()[0]

    # Записываем транзакцию
    cur.execute("""
        INSERT INTO transactions (player_id, amount, transaction_type, description)
        VALUES (%s, %s, %s, %s)
    """, (player_id, amount_coins, 'donate', f'Пополнение через Robokassa, заказ {order_number}'))

    conn.commit()
    cur.close()
    conn.close()

    return {'statusCode': 200, 'headers': HEADERS, 'body': f'OK{inv_id}', 'isBase64Encoded': False}
