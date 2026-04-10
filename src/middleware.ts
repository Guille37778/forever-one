import { defineMiddleware } from 'astro:middleware';
import { initSupabase } from './lib/supabase';

export const onRequest = defineMiddleware(async (context, next) => {
    // Capturar variables de entorno desde el runtime de Cloudflare
    const env = (context.locals as any).runtime?.env || {};
    
    // Log de diagnóstico en servidor para depuración
    const host = context.request.headers.get('host') || 'unknown';
    const hasKeys = !!(env.SUPABASE_URL || env.PUBLIC_SUPABASE_URL);
    console.log(`[Middleware] Request to ${host} | Env Keys Found: ${hasKeys}`);

    // Inicializar el cliente de Supabase con las llaves vivas del panel
    initSupabase(env);
    
    return next();
});
