import { createClient } from '@supabase/supabase-js';

let _supabase: any = null;
let _supabaseAdmin: any = null;

// Lógica de inicialización dinámica para Cloudflare Workers
export function initSupabase(env: any = {}) {
    // Si ya tenemos un cliente real y no nos pasan nuevas variables, no hacemos nada
    const isMock = !_supabase || _supabase === mockClient;
    if (!isMock && Object.keys(env).length === 0) return;

    // Buscamos en todas las fuentes posibles (Cloudflare bindings, Astro locals, Process, Global)
    const g = (typeof globalThis !== 'undefined' ? globalThis : {}) as any;
    
    // Prioridad: 1. Inyectado por middleware (env), 2. Global (Cloudflare), 3. Process (Node/Polyfill), 4. Meta (Build time)
    const supabaseUrl = 
        env.SUPABASE_URL || 
        env.PUBLIC_SUPABASE_URL || 
        g.SUPABASE_URL || 
        g.PUBLIC_SUPABASE_URL || 
        (typeof process !== 'undefined' ? (process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL) : '') ||
        import.meta.env.SUPABASE_URL || 
        import.meta.env.PUBLIC_SUPABASE_URL || 
        '';

    const supabaseAnonKey = 
        env.SUPABASE_ANON_KEY || 
        env.PUBLIC_SUPABASE_ANON_KEY || 
        g.SUPABASE_ANON_KEY || 
        g.PUBLIC_SUPABASE_ANON_KEY || 
        (typeof process !== 'undefined' ? (process.env.SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY) : '') ||
        import.meta.env.SUPABASE_ANON_KEY || 
        import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 
        '';

    const supabaseServiceKey = 
        env.SUPABASE_SERVICE_ROLE_KEY || 
        g.SUPABASE_SERVICE_ROLE_KEY || 
        (typeof process !== 'undefined' ? process.env.SUPABASE_SERVICE_ROLE_KEY : '') ||
        import.meta.env.SUPABASE_SERVICE_ROLE_KEY || 
        '';

    // Log de diagnóstico seguro (solo visible en el panel de Cloudflare)
    if (supabaseUrl && supabaseAnonKey) {
        _supabase = createClient(supabaseUrl, supabaseAnonKey);
        console.log(`✅ Supabase Initialized: ${supabaseUrl.substring(0, 15)}... | Key: ${supabaseAnonKey.substring(0, 10)}...`);
    } else {
        if (!isMock) console.warn('⚠️ Supabase connection failed: Missing keys in current context.');
    }

    if (supabaseUrl && supabaseServiceKey && supabaseServiceKey.length > 20) {
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
