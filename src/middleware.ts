import type { MiddlewareHandler } from 'astro';
import { supabase } from './lib/supabase';

export const onRequest: MiddlewareHandler = async ({ request, cookies, redirect }, next) => {
  const url = new URL(request.url);

  // Solo proteger rutas /admin (excepto login y verify)
  const isAdminRoute = url.pathname.startsWith('/admin');
  const isPublicAdminRoute = url.pathname === '/admin/login' || url.pathname.startsWith('/admin/verify') || url.pathname === '/admin/login/';

  if (!isAdminRoute || isPublicAdminRoute) {
    return next();
  }

  // Verificar sesión
  const accessToken = cookies.get('sb-access-token')?.value;

  if (!accessToken) {
    return redirect('/admin/login');
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return redirect('/admin/login');
  }

  return next();
};
