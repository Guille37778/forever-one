-- =============================================
-- MÓDULO DE PROVEEDORES — Migración SQL
-- Script independiente: solo CREA tablas nuevas
-- NO modifica tablas existentes del sistema
-- Ejecutar en: Supabase → SQL Editor
-- =============================================

-- ─── PROVEEDORES ─────────────────────────────
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  phone_secondary TEXT,
  city TEXT,
  address TEXT,
  website TEXT,
  notes TEXT,
  payment_terms TEXT,
  tags TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  is_confidential BOOLEAN DEFAULT FALSE,
  next_restock_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── PERFILES DE REDES SOCIALES ──────────────
CREATE TABLE IF NOT EXISTS supplier_social_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  handle TEXT,
  url TEXT
);

-- ─── HISTORIAL DE COMPRAS ────────────────────
CREATE TABLE IF NOT EXISTS supplier_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  purchase_date DATE NOT NULL,
  reference_code TEXT,
  description TEXT,
  total_usd NUMERIC(10,2),
  total_local NUMERIC(12,2),
  currency_local TEXT DEFAULT 'VES',
  payment_method TEXT,
  items_summary TEXT[],
  notes TEXT,
  quality_rating INTEGER CHECK (quality_rating BETWEEN 1 AND 5),
  punctuality_rating INTEGER CHECK (punctuality_rating BETWEEN 1 AND 5),
  communication_rating INTEGER CHECK (communication_rating BETWEEN 1 AND 5),
  price_rating INTEGER CHECK (price_rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── DOCUMENTOS ADJUNTOS ─────────────────────
CREATE TABLE IF NOT EXISTS supplier_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ÍNDICES PARA RENDIMIENTO ────────────────
CREATE INDEX IF NOT EXISTS idx_suppliers_active ON suppliers(is_active);
CREATE INDEX IF NOT EXISTS idx_suppliers_tags ON suppliers USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_supplier_social_supplier ON supplier_social_profiles(supplier_id);
CREATE INDEX IF NOT EXISTS idx_supplier_purchases_supplier ON supplier_purchases(supplier_id);
CREATE INDEX IF NOT EXISTS idx_supplier_purchases_date ON supplier_purchases(purchase_date DESC);
CREATE INDEX IF NOT EXISTS idx_supplier_documents_supplier ON supplier_documents(supplier_id);

-- ─── RLS (Row Level Security) ────────────────
-- Solo usuarios autenticados pueden acceder
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_social_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_documents ENABLE ROW LEVEL SECURITY;

-- Política: acceso total para usuarios autenticados (admins)
CREATE POLICY "Admins full access on suppliers"
  ON suppliers FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access on supplier_social_profiles"
  ON supplier_social_profiles FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access on supplier_purchases"
  ON supplier_purchases FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access on supplier_documents"
  ON supplier_documents FOR ALL
  USING (auth.role() = 'authenticated');

-- ─── TRIGGER: Auto-update updated_at ─────────
CREATE OR REPLACE FUNCTION update_supplier_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_supplier_updated_at
  BEFORE UPDATE ON suppliers
  FOR EACH ROW
  EXECUTE FUNCTION update_supplier_updated_at();
