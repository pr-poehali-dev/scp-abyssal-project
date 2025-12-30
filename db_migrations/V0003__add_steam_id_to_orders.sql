ALTER TABLE orders ADD COLUMN IF NOT EXISTS steam_id VARCHAR(100);
CREATE INDEX IF NOT EXISTS idx_orders_steam_id ON orders(steam_id);