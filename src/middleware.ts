import { defineMiddleware } from 'astro:middleware';
import { initSupabase } from './lib/supabase';

export const onRequest = defineMiddleware(async (context, next) => {
    // Capturar variables de entorno desde el runtime de Cloudflare
    const env = (context.locals as any).runtime?.env || {};
    
    // Inicializar el cliente de Supabase con las llaves vivas del panel
    initSupabase(env);
    
    return next();
});
