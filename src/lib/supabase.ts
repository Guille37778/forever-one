import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || (!supabaseAnonKey && !supabaseServiceKey)) {
  throw new Error('Faltan las variables de entorno de Supabase. Verifica tu archivo .env');
}

// Cliente estándar con ANON_KEY (sujeto a RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey || '');

// Cliente administrativo con SERVICE_ROLE_KEY (salta RLS)
// Solo debe usarse en API Routes (servidor)
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase;
