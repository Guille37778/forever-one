-- =============================================
-- FOREVER ONE — Schema SQL para Supabase
-- Ejecutar en: Supabase → SQL Editor → New Query
-- =============================================

-- ENUMS
DO $$ BEGIN
  CREATE TYPE size AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'UNICO');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE order_status AS ENUM ('verificando', 'preparando', 'enviado', 'entregado', 'cancelado');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE courier AS ENUM ('zoom', 'tealca', 'mrw', 'dhl', 'otro');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- COLECCIONES
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- SUBCATEGORÍAS
CREATE TABLE IF NOT EXISTS subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_category TEXT NOT NULL,         -- "ropa", "accesorios"
  created_at TIMESTAMPTZ DEFAULT now()
);

-- PRODUCTOS
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  subcategory_id UUID REFERENCES subcategories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  category TEXT DEFAULT 'ropa',          -- "ropa", "accesorios"
  image_urls TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- VARIANTES (Stock por Talla)
CREATE TABLE IF NOT EXISTS variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  size size NOT NULL,
  stock_quantity INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- PERFILES DE CLIENTES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  full_name TEXT,
  email TEXT NOT NULL UNIQUE,
  city TEXT,
  total_orders INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ÓRDENES
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code TEXT NOT NULL UNIQUE,
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  city TEXT,
  courier courier,
  total_usd NUMERIC(10,2) NOT NULL,
  payment_reference TEXT,
  screenshot_url TEXT,
  tracking_number TEXT,
  status order_status DEFAULT 'verificando',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ITEMS DE ÓRDENES
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES variants(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  size TEXT,
  price_usd NUMERIC(10,2) NOT NULL,
  quantity INTEGER DEFAULT 1 NOT NULL
);

-- ANALYTICS
CREATE TABLE IF NOT EXISTS product_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL UNIQUE,
  views INTEGER DEFAULT 0,
  whatsapp_clicks INTEGER DEFAULT 0,
  avg_time_on_page_seconds INTEGER DEFAULT 0,
  city_interest TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- LEADS (Marketing)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS) — Seguridad
-- =============================================
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Lectura pública para productos y colecciones activas
DROP POLICY IF EXISTS "Productos públicos" ON products;
CREATE POLICY "Productos públicos" ON products FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Colecciones públicas" ON collections;
CREATE POLICY "Colecciones públicas" ON collections FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Subcategorías públicas" ON subcategories;
CREATE POLICY "Subcategorías públicas" ON subcategories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Variantes públicas" ON variants;
CREATE POLICY "Variantes públicas" ON variants FOR SELECT USING (true);

-- POLÍTICAS PÚBLICAS (Para que el checkout funcione sin login)
DROP POLICY IF EXISTS "Insertar orden pública" ON orders;
CREATE POLICY "Insertar orden pública" ON orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Insertar items público" ON order_items;
CREATE POLICY "Insertar items público" ON order_items FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Actualización de analíticas pública" ON product_stats;
CREATE POLICY "Actualización de analíticas pública" ON product_stats FOR ALL USING (true) WITH CHECK (true);

-- Solo usuarios autenticados pueden administrar todo (ADMIN)
DROP POLICY IF EXISTS "Admin productos" ON products;
CREATE POLICY "Admin productos" ON products FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin subcategories" ON subcategories;
CREATE POLICY "Admin subcategories" ON subcategories FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin colecciones" ON collections;
CREATE POLICY "Admin colecciones" ON collections FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin variantes" ON variants;
CREATE POLICY "Admin variantes" ON variants FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin ordenes" ON orders;
CREATE POLICY "Admin ordenes" ON orders FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin items" ON order_items;
CREATE POLICY "Admin items" ON order_items FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin analytics" ON product_stats;
CREATE POLICY "Admin analytics" ON product_stats FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin leads" ON leads;
CREATE POLICY "Admin leads" ON leads FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- AUTO-CONTADOR DE ÓRDENES (FO-001, FO-002...)
-- =============================================
CREATE SEQUENCE IF NOT EXISTS order_counter START 1;

CREATE OR REPLACE FUNCTION generate_order_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_code IS NULL THEN
    NEW.order_code := 'FO-' || LPAD(nextval('order_counter')::TEXT, 3, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_order_code ON orders;
CREATE TRIGGER set_order_code
BEFORE INSERT ON orders
FOR EACH ROW EXECUTE FUNCTION generate_order_code();
