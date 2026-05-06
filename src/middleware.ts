import { defineMiddleware } from 'astro:middleware';
import { initSupabase } from './lib/supabase';

export const onRequest = defineMiddleware(async (context, next) => {
    const startTime = Date.now();
    const url = new URL(context.request.url);
    
    // Capturar variables de entorno desde el runtime de Cloudflare
    const env = (context.locals as any).runtime?.env || {};
    
    // Log de inicio de petición
    const host = context.request.headers.get('host') || 'unknown';
    console.log(`[Middleware] ${context.request.method} ${url.pathname} | Host: ${host}`);

    try {
        // Inicializar el cliente de Supabase con las llaves vivas del panel
        initSupabase(env);
        
        // Verificar si se inicializó correctamente
        const { supabase } = await import('./lib/supabase');
        const hasClient = !!supabase && typeof supabase.from === 'function';
        console.log(`[Middleware] Supabase Init: ${hasClient ? 'SUCCESS' : 'FAILED'}`);
        
        const response = await next();
        const duration = Date.now() - startTime;
        console.log(`[Middleware] Response: ${response.status} | Duration: ${duration}ms`);
        return response;
    } catch (error: any) {
        console.error(`[Middleware] Error in request: ${error.message}`);
        return next();
    }
});
