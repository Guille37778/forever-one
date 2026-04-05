import { s as supabase } from './chunks/supabase_CUGkxkOG.mjs';
import { ag as sequence } from './chunks/sequence_BZ_GwenZ.mjs';

const onRequest$1 = async ({ request, cookies, redirect }, next) => {
  const url = new URL(request.url);
  const isAdminRoute = url.pathname.startsWith("/admin");
  const isPublicAdminRoute = url.pathname === "/admin/login" || url.pathname.startsWith("/admin/verify");
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
