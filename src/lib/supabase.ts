import { createClient } from '@supabase/supabase-js';

let _supabase: any = null;
let _supabaseAdmin: any = null;

// Lógica de inicialización dinámica para Cloudflare Workers
export function initSupabase(env: any = {}) {
    if (_supabase && _supabaseAdmin) return;

    const supabaseUrl = env.SUPABASE_URL || env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = env.SUPABASE_ANON_KEY || env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';
    const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

    if (supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey) {
        _supabase = createClient(supabaseUrl, supabaseAnonKey);
    }

    if (supabaseUrl && supabaseUrl.startsWith('http') && supabaseServiceKey) {
        _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    } else {
        _supabaseAdmin = _supabase;
    }
}

// Objeto mock para evitar errores antes de la inicialización
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

// Exportamos Proxies que se redirigen al cliente real una vez inicializado
export const supabase = new Proxy({}, {
    get: (target, prop) => {
        if (!_supabase) initSupabase(); // Intento de inicialización perezosa con env vars estáticos
        return (_supabase || mockClient)[prop];
    }
}) as any;

export const supabaseAdmin = new Proxy({}, {
    get: (target, prop) => {
        if (!_supabaseAdmin) initSupabase();
        return (_supabaseAdmin || _supabase || mockClient)[prop];
    }
}) as any;
