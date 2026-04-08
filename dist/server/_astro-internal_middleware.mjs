import { s as supabase } from './chunks/supabase_FqJk9_vE.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_B38TyWiE.mjs';
import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import './chunks/astro/server_BtsvdxdT.mjs';
import 'clsx';
import 'cookie';
import { s as sequence } from './chunks/index_Dsbm_Fvf.mjs';

const onRequest$1 = async ({ request, cookies, redirect }, next) => {
  const url = new URL(request.url);
  const isAdminRoute = url.pathname.startsWith("/admin");
  const isPublicAdminRoute = url.pathname === "/admin/login" || url.pathname.startsWith("/admin/verify") || url.pathname === "/admin/login/";
  if (!isAdminRoute || isPublicAdminRoute) {
    return next();
  }
  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return redirect("/admin/login");
  }
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) {
    return redirect("/admin/login");
  }
  return next();
};

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
