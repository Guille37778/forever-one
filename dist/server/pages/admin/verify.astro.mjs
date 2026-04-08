import { e as createComponent, h as createAstro } from '../../chunks/astro/server_BtsvdxdT.mjs';
import 'kleur/colors';
import 'clsx';
import { s as supabase } from '../../chunks/supabase_FqJk9_vE.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Verify = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Verify;
  const url = new URL(Astro2.request.url);
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  if (tokenHash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type
    });
    if (!error && data.session) {
      Astro2.cookies.set("sb-access-token", data.session.access_token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: Astro2.url.protocol === "https:",
        // Solo usar secure en producción (HTTPS)
        maxAge: 60 * 60 * 24 * 7
        // 7 días
      });
      Astro2.cookies.set("sb-refresh-token", data.session.refresh_token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: Astro2.url.protocol === "https:",
        // Solo usar secure en producción (HTTPS)
        maxAge: 60 * 60 * 24 * 30
        // 30 días
      });
      return Astro2.redirect("/admin/dashboard");
    }
  }
  return Astro2.redirect("/admin/login?error=invalid_token");
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/verify.astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/verify.astro";
const $$url = "/admin/verify";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Verify,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
