import type { MiddlewareHandler } from 'astro';
import { supabase } from '../lib/supabase';

// Middleware para proteger todas las rutas /admin
export const onRequest: MiddlewareHandler = async ({ request, redirect }, next) => {
  const url = new URL(request.url);
  
  // Solo proteger rutas que empiecen con /admin
  if (!url.pathname.startsWith('/admin')) {
    return next();
  }

  // Verificar si hay sesión activa
  const cookie = request.headers.get('cookie') || '';
  const accessToken = extractToken(cookie);

  if (!accessToken) {
    return redirect('/admin/login');
  }

  // Verificar el token con Supabase
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return redirect('/admin/login');
  }

  return next();
};

function extractToken(cookieString: string): string | null {
  const match = cookieString.match(/sb-access-token=([^;]+)/);
  return match ? match[1] : null;
}
