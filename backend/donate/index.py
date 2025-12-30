import json
import os
import hashlib
import psycopg2
import random
import re
from urllib.parse import urlencode
from datetime import datetime


def calculate_signature(*args) -> str:
    """Создание MD5 подписи по документации Robokassa"""
    joined = ':'.join(str(arg) for arg in args)
    return hashlib.md5(joined.encode()).hexdigest()


def get_db_connection():
    """Получение подключения к БД"""
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not configured')
    return psycopg2.connect(dsn)


def is_valid_steam_id(steam_id: str) -> bool:
    """Проверка корректности формата Steam ID"""
    if not steam_id:
        return False
    
    # Steam ID64 (17 цифр, начинается с 7656119)
    if re.match(r'^7656119\d{10}$', steam_id):
        return True
    
    # Steam ID3 формат [U:1:XXXXXXXX]
    if re.match(r'^\[U:1:\d+\]$', steam_id):
        return True
    
    # Steam ID старый формат STEAM_0:X:XXXXXXXX
    if re.match(r'^STEAM_[0-5]:[01]:\d+$', steam_id):
        return True
    
    return False


HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Session-Id, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
}

ROBOKASSA_URL = 'https://auth.robokassa.ru/Merchant/Index.aspx'


def handler(event: dict, context) -> dict:
    '''
    Создание заказа на пополнение баланса игрока через Robokassa.
    POST body: steam_id, amount, user_email (опционально)
    Returns: payment_url, order_id, order_number
    '''
    method = event.get('httpMethod', 'GET').upper()

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': '', 'isBase64Encoded': False}

    if method != 'POST':
        return {'statusCode': 405, 'headers': HEADERS, 'body': json.dumps({'error': 'Method not allowed'}), 'isBase64Encoded': False}

    try:
        merchant_login = os.environ.get('ROBOKASSA_MERCHANT_LOGIN')
        password_1 = os.environ.get('ROBOKASSA_PASSWORD_1')

        if not merchant_login or not password_1:
            return {'statusCode': 500, 'headers': HEADERS, 'body': json.dumps({'error': 'Robokassa не настроена'}), 'isBase64Encoded': False}

        body_str = event.get('body', '{}')
        payload = json.loads(body_str)

        steam_id = str(payload.get('steam_id', '')).strip()
        amount = float(payload.get('amount', 0))
        user_email = str(payload.get('user_email', '')).strip()

        # Валидация Steam ID
        if not is_valid_steam_id(steam_id):
            return {'statusCode': 400, 'headers': HEADERS, 'body': json.dumps({'error': 'Некорректный Steam ID'}), 'isBase64Encoded': False}

        if amount <= 0:
            return {'statusCode': 400, 'headers': HEADERS, 'body': json.dumps({'error': 'Сумма должна быть больше 0'}), 'isBase64Encoded': False}

        conn = get_db_connection()
        cur = conn.cursor()

        # Генерация уникального InvoiceID
        for _ in range(10):
            robokassa_inv_id = random.randint(100000, 2147483647)
            cur.execute("SELECT COUNT(*) FROM orders WHERE robokassa_inv_id = %s", (robokassa_inv_id,))
            if cur.fetchone()[0] == 0:
                break

        order_number = f"DONATE-{datetime.now().strftime('%Y%m%d')}-{robokassa_inv_id}"

        # Создаём заказ
        cur.execute("""
            INSERT INTO orders (order_number, user_name, user_email, amount, robokassa_inv_id, status, steam_id, order_comment)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (order_number, steam_id, user_email or 'no-email@example.com', round(amount, 2), robokassa_inv_id, 'pending', steam_id, f'Пополнение баланса для {steam_id}'))

        order_id = cur.fetchone()[0]

        # Добавляем item в заказ
        cur.execute("""
            INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity)
            VALUES (%s, %s, %s, %s, %s)
        """, (order_id, 'donate_balance', f'Пополнение баланса ({steam_id})', round(amount, 2), 1))

        # Формирование ссылки на оплату
        amount_str = f"{amount:.2f}"
        signature = calculate_signature(merchant_login, amount_str, robokassa_inv_id, password_1)

        query_params = {
            'MerchantLogin': merchant_login,
            'OutSum': amount_str,
            'InvoiceID': robokassa_inv_id,
            'SignatureValue': signature,
            'Culture': 'ru',
            'Description': f'Пополнение баланса {steam_id}'
        }

        if user_email:
            query_params['Email'] = user_email

        payment_url = f"{ROBOKASSA_URL}?{urlencode(query_params)}"

        cur.execute("UPDATE orders SET payment_url = %s WHERE id = %s", (payment_url, order_id))
        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': json.dumps({
                'payment_url': payment_url,
                'order_id': order_id,
                'order_number': order_number
            }),
            'isBase64Encoded': False
        }
    except Exception as e:
        import traceback
        print(f"Donate error: {e}")
        print(traceback.format_exc())
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
