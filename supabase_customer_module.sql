-- ═══════════════════════════════════════════════════════════
-- MIGRACIÓN: MÓDULO DE CLIENTES — POLÍTICAS RLS CORREGIDAS
-- Ejecutar en: Supabase → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════

-- ─── 1. TABLA PROFILES ───────────────────────────────────

-- Habilitar RLS si no está habilitado
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política: el cliente puede ver su propio perfil
DROP POLICY IF EXISTS "Clientes ven su perfil" ON public.profiles;
CREATE POLICY "Clientes ven su perfil" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Política: el cliente puede actualizar su propio perfil
DROP POLICY IF EXISTS "Clientes actualizan su perfil" ON public.profiles;
CREATE POLICY "Clientes actualizan su perfil" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Política: el cliente puede insertar su propio perfil (necesario para upsert desde cliente)
DROP POLICY IF EXISTS "Clientes insertan su perfil" ON public.profiles;
CREATE POLICY "Clientes insertan su perfil" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ─── 2. TABLA ORDERS ─────────────────────────────────────

-- Política: el cliente puede ver SOLO sus propios pedidos (por profile_id)
DROP POLICY IF EXISTS "Clientes ven sus pedidos" ON public.orders;
CREATE POLICY "Clientes ven sus pedidos" ON public.orders
  FOR SELECT USING (profile_id = auth.uid());

-- ─── 3. TABLA ORDER_ITEMS ─────────────────────────────────

-- Política: el cliente puede ver los items de sus propias órdenes
DROP POLICY IF EXISTS "Clientes ven sus items" ON public.order_items;
CREATE POLICY "Clientes ven sus items" ON public.order_items
  FOR SELECT USING (
    order_id IN (
      SELECT id FROM public.orders WHERE profile_id = auth.uid()
    )
  );

-- ─── 4. TRIGGER: CREAR PERFIL AUTOMÁTICO AL REGISTRARSE ──

-- Asegura que el perfil se crea automáticamente en el registro con Google
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── 5. BACKFILL: POBLAR PERFILES DE CLIENTES EXISTENTES ──
-- Esto crea el perfil para cualquier usuario que ya existe
-- pero que no tiene perfil creado (registros anteriores al trigger)

INSERT INTO public.profiles (id, full_name, email)
SELECT
  au.id,
  COALESCE(
    au.raw_user_meta_data->>'full_name',
    au.raw_user_meta_data->>'name',
    split_part(au.email, '@', 1)
  ),
  au.email
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════════════════
-- VERIFICACIÓN (ejecutar por separado para confirmar)
-- ═══════════════════════════════════════════════════════════
-- SELECT COUNT(*) FROM public.profiles;
-- SELECT * FROM public.profiles LIMIT 5;
