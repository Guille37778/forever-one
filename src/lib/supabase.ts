import { createClient } from '@supabase/supabase-js';

// SINGLETON: Client instances for the entire application life (per request on server)
let _supabase: any = null;
let _supabaseAdmin: any = null;

// Mock client for safety during early access
const mockClient = {
    from: () => ({
        select: () => ({
            order: () => Promise.resolve({ data: [], error: null }),
            eq: () => ({ 
                single: () => Promise.resolve({ data: null, error: null }),
                order: () => Promise.resolve({ data: [], error: null }),
                in: () => Promise.resolve({ data: [], error: null })
            }),
            single: () => Promise.resolve({ data: null, error: null }),
            in: () => Promise.resolve({ data: [], error: null })
        })
    }),
    auth: { 
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null })
    }
} as any;

/**
 * Initializes Supabase clients using the best available environment variables.
 * Designed for Cloudflare Workers (Astro) where env vars are in the context.
 */
export function initSupabase(env: any = {}) {
    // If we're in the browser and already have a client, don't recreate it
    // This prevents the 'Auth instance and storage' locks that cause hangs.
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser && _supabase && _supabase !== mockClient) {
        return;
    }

    // On the server, we might need to re-initialize if new env vars are provided
    // but we should avoid doing it more than once per execution if possible.
    if (!isBrowser && _supabase && _supabase !== mockClient && Object.keys(env).length === 0) {
        return;
    }

    // Resolve keys with priority
    const g = (globalThis || {}) as any;
    const getVar = (key: string) => 
        env[key] || 
        env[`PUBLIC_${key}`] || 
        g[key] || 
        g[`PUBLIC_${key}`] || 
        (typeof process !== 'undefined' ? (process.env[key] || process.env[`PUBLIC_${key}`]) : '') ||
        (import.meta as any).env[key] || 
        (import.meta as any).env[`PUBLIC_${key}`] || 
        '';

    const supabaseUrl = getVar('SUPABASE_URL');
    const supabaseAnonKey = getVar('SUPABASE_ANON_KEY');
    const supabaseServiceKey = getVar('SUPABASE_SERVICE_ROLE_KEY');

    if (supabaseUrl && supabaseAnonKey) {
        const authConfig: any = {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            // PKCE can be flaky in some SSR environments if cookies aren't handled perfectly
            // but we keep it enabled as it's the modern standard.
            flowType: 'pkce'
        };

        try {
            _supabase = createClient(supabaseUrl, supabaseAnonKey, { auth: authConfig });
            
            if (supabaseServiceKey && supabaseServiceKey.length > 20) {
                _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
                    auth: { persistSession: false }
                });
            } else {
                _supabaseAdmin = _supabase;
            }

            if (isBrowser) console.log(`✅ Supabase Shielding Active ✦`);
        } catch (e) {
            console.error('❌ Failed to create Supabase client:', e);
            _supabase = mockClient;
            _supabaseAdmin = mockClient;
        }
    } else {
        // Fallback to mock if no keys found yet
        if (!_supabase) {
            _supabase = mockClient;
            _supabaseAdmin = mockClient;
        }
    }
}

// Export lazy-initialized proxies to allow importing before initSupabase is called
export const supabase = new Proxy({}, {
    get: (target, prop) => {
        if (!_supabase || _supabase === mockClient) initSupabase();
        return (_supabase || mockClient)[prop];
    }
}) as any;

export const supabaseAdmin = new Proxy({}, {
    get: (target, prop) => {
        if (!_supabaseAdmin || _supabaseAdmin === mockClient) initSupabase();
        return (_supabaseAdmin || _supabase || mockClient)[prop];
    }
}) as any;

// Expose to window for inline scripts if in browser
if (typeof window !== 'undefined') {
    (window as any).supabase = supabase;
}
