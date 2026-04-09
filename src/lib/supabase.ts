import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

// Cliente estándar con ANON_KEY (sujeto a RLS)
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({}, {
      get: function(target, prop) {
        if (prop === 'then') return undefined;
        const noop = () => Promise.resolve({ data: [], error: new Error('Supabase not initialized') });
        const proxy: any = new Proxy(noop, {
          get: (t, p) => (p === 'then' ? undefined : proxy),
          apply: () => proxy
        });
        return proxy;
      }
    }) as any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables are MISSING in this environment.');
}

// Cliente administrativo con SERVICE_ROLE_KEY (salta RLS)
// Solo debe usarse en API Routes (servidor)
export const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase;

if (!supabaseAdmin) {
  console.warn('⚠️ Supabase Admin client could not be initialized. Check your environment variables.');
}
