import { createClient } from '@supabase/supabase-js';

// Determinar las variables en un entorno de Cloudflare / Astro
const rawUrl = import.meta.env.SUPABASE_URL || (typeof process !== 'undefined' ? process.env.SUPABASE_URL : '');
const publicUrl = import.meta.env.PUBLIC_SUPABASE_URL || (typeof process !== 'undefined' ? process.env.PUBLIC_SUPABASE_URL : '');
const supabaseUrl = (rawUrl && rawUrl.length > 20) ? rawUrl : publicUrl;

const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY || (typeof process !== 'undefined' ? (process.env.SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY) : '');
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || (typeof process !== 'undefined' ? process.env.SUPABASE_SERVICE_ROLE_KEY : '');

// Cliente estándar con ANON_KEY
// Usamos un objeto mock muy simple si no hay variables
const mockClient = {
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null }),
      eq: () => ({ 
        single: () => Promise.resolve({ data: null, error: null }),
        order: () => Promise.resolve({ data: [], error: null })
      }),
      single: () => Promise.resolve({ data: null, error: null })
    })
  }),
  auth: { getSession: () => Promise.resolve({ data: { session: null } }) }
} as any;

export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockClient;

export const supabaseAdmin = (supabaseUrl && supabaseServiceKey && supabaseUrl.startsWith('http'))
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Using mock client.');
}
