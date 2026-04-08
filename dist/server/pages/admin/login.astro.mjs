import { e as createComponent, l as renderHead, k as renderScript, r as renderTemplate, h as createAstro } from '../../chunks/astro/server_BtsvdxdT.mjs';
import 'kleur/colors';
import 'clsx';
import { s as supabase } from '../../chunks/supabase_FqJk9_vE.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const cookie = Astro2.request.headers.get("cookie") || "";
  const accessToken = cookie.match(/sb-access-token=([^;]+)/)?.[1];
  if (accessToken) {
    const { data: { user } } = await supabase.auth.getUser(accessToken);
    if (user) return Astro2.redirect("/admin/dashboard");
  }
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const email = formData.get("email")?.toString();
      const password = formData.get("password")?.toString();
      if (email && password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error || !data.session) {
          return new Response(JSON.stringify({ error: "Credenciales incorrectas" }), { status: 401 });
        } else {
          const isSecure = Astro2.url.protocol === "https:";
          const accessTokenCookie = `sb-access-token=${data.session.access_token}; Path=/; HttpOnly; SameSite=Lax${isSecure ? "; Secure" : ""}; Max-Age=604800`;
          const refreshTokenCookie = `sb-refresh-token=${data.session.refresh_token}; Path=/; HttpOnly; SameSite=Lax${isSecure ? "; Secure" : ""}; Max-Age=2592000`;
          const headers = new Headers();
          headers.append("Set-Cookie", accessTokenCookie);
          headers.append("Set-Cookie", refreshTokenCookie);
          headers.append("Content-Type", "application/json");
          return new Response(JSON.stringify({ success: true }), { status: 200, headers });
        }
      }
      return new Response(JSON.stringify({ error: "Faltan credenciales" }), { status: 400 });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Error interno" }), { status: 500 });
    }
  }
  return renderTemplate`<html lang="es" data-astro-cid-rf56lckb> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Entrar al Atelier — Forever One</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-rf56lckb> <!-- Audio de Apertura --> <audio id="audio-login" src="/audio_apertura.mp3" preload="auto" data-astro-cid-rf56lckb></audio> <!-- Overlay de Transición --> <div class="intro-overlay" id="intro-overlay" data-astro-cid-rf56lckb> <div class="intro-logo" data-astro-cid-rf56lckb></div> <div id="status-text" class="success-text" data-astro-cid-rf56lckb>Bienvenida Nazareth</div> </div> <!-- Panel Izquierdo Decorativo --> <div class="panel-left" data-astro-cid-rf56lckb> <div class="brand-container" data-astro-cid-rf56lckb> <div class="logo-icon" data-astro-cid-rf56lckb></div> <h1 class="brand-name" data-astro-cid-rf56lckb>Forever <span data-astro-cid-rf56lckb>One</span></h1> <p class="brand-tagline" data-astro-cid-rf56lckb>Gestión Exclusiva</p> </div> </div> <!-- Panel Derecho de Login --> <div class="panel-right" data-astro-cid-rf56lckb> <div id="error-box" class="error-box" data-astro-cid-rf56lckb></div> <div class="login-header" data-astro-cid-rf56lckb> <div class="mobile-logo" data-astro-cid-rf56lckb></div> <p class="login-tag" data-astro-cid-rf56lckb>✦ Atelier de Lujo ✦</p> <h2 class="login-title" data-astro-cid-rf56lckb>Bienvenido</h2> <p class="login-subtitle" data-astro-cid-rf56lckb>Identifíquese para entrar al sistema</p> </div> <form class="login-form" id="login-form" data-astro-cid-rf56lckb> <div class="form-group" data-astro-cid-rf56lckb> <label for="email" data-astro-cid-rf56lckb>Correo Electrónico</label> <input type="email" id="email" name="email" placeholder="admin@foreverone.com" required data-astro-cid-rf56lckb> </div> <div class="form-group" data-astro-cid-rf56lckb> <label for="password" data-astro-cid-rf56lckb>Contraseña</label> <input type="password" id="password" name="password" placeholder="••••••••" required data-astro-cid-rf56lckb> </div> <button type="submit" class="submit-btn" id="submit-btn" data-astro-cid-rf56lckb>Abrir Sistema →</button> </form> <p class="login-footer" data-astro-cid-rf56lckb>
¿Sin acceso? <a href="/admin/register" data-astro-cid-rf56lckb>Solicitar cuenta</a> </p> <div class="bottom-meta" data-astro-cid-rf56lckb>
🔒 Encrypted Secure Atelier Node
</div> </div> ${renderScript($$result, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/login.astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
