import { c as createComponent } from './astro-component_D3bPY0Kc.mjs';
import 'piccolore';
import { b9 as renderHead, a3 as addAttribute, Q as renderTemplate } from './sequence_BZ_GwenZ.mjs';
import 'clsx';
import { r as renderScript } from './script_C8kPsTrl.mjs';
import { s as supabase } from './supabase_CUGkxkOG.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  const cookie = Astro2.request.headers.get("cookie") || "";
  const accessToken = cookie.match(/sb-access-token=([^;]+)/)?.[1];
  if (accessToken) {
    const { data: { user } } = await supabase.auth.getUser(accessToken);
    if (user) return Astro2.redirect("/admin/dashboard");
  }
  let message = "";
  let messageType = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    if (email && password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        message = `Credenciales incorrectas. Por favor verifique e intente de nuevo.`;
        messageType = "error";
      } else if (data.session) {
        Astro2.cookies.set("sb-access-token", data.session.access_token, {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          secure: Astro2.url.protocol === "https:",
          maxAge: 60 * 60 * 24 * 7
        });
        Astro2.cookies.set("sb-refresh-token", data.session.refresh_token, {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          secure: Astro2.url.protocol === "https:",
          maxAge: 60 * 60 * 24 * 30
        });
        return Astro2.redirect("/admin/dashboard");
      }
    }
  }
  return renderTemplate`<html lang="es" data-astro-cid-rf56lckb> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Entrar al Atelier — Forever One</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-rf56lckb> <!-- Left brand panel --> <div class="panel-left" data-astro-cid-rf56lckb> <div class="brand-container" data-astro-cid-rf56lckb> <div class="logo-icon" aria-label="Forever One Logo" data-astro-cid-rf56lckb></div> <h1 class="brand-name" data-astro-cid-rf56lckb>Forever <span data-astro-cid-rf56lckb>One</span></h1> <p class="brand-tagline" data-astro-cid-rf56lckb>Atelier de Lujo ✦ Gestión Exclusiva</p> </div> <p class="panel-left-footer" data-astro-cid-rf56lckb>Sistema de Administración Privado</p> </div> <!-- Right login panel --> <div class="panel-right" data-astro-cid-rf56lckb> <div class="login-header" data-astro-cid-rf56lckb> <p class="login-tag" data-astro-cid-rf56lckb>✦ Acceso Privado</p> <h2 class="login-title" data-astro-cid-rf56lckb>Bienvenido</h2> <p class="login-subtitle" data-astro-cid-rf56lckb>Identifíquese para continuar</p> </div> ${message && renderTemplate`<div${addAttribute(`message ${messageType}`, "class")} data-astro-cid-rf56lckb>${message}</div>`} <form method="POST" class="login-form" data-astro-cid-rf56lckb> <div class="form-group" data-astro-cid-rf56lckb> <label for="email" data-astro-cid-rf56lckb>Correo Electrónico</label> <input type="email" id="email" name="email" placeholder="admin@foreverone.com" required autocomplete="email" data-astro-cid-rf56lckb> </div> <div class="form-group" data-astro-cid-rf56lckb> <label for="password" data-astro-cid-rf56lckb>Contraseña</label> <input type="password" id="password" name="password" placeholder="••••••••" required autocomplete="current-password" data-astro-cid-rf56lckb> </div> <button type="submit" class="submit-btn" data-astro-cid-rf56lckb>Entrar al Atelier →</button> </form> <p class="login-footer" data-astro-cid-rf56lckb>
¿Primera vez? <a href="/admin/register" data-astro-cid-rf56lckb>Crear cuenta administrativa</a> </p> <div class="security-badge" data-astro-cid-rf56lckb>
🔒 Conexión Segura · Forever One
</div> </div> <div class="intro-overlay" id="intro-overlay" data-astro-cid-rf56lckb> <div class="intro-logo" data-astro-cid-rf56lckb></div> <h1 class="brand-name intro-text" data-astro-cid-rf56lckb>Forever <span data-astro-cid-rf56lckb>One</span></h1> <p class="intro-loading" data-astro-cid-rf56lckb>Abriendo Puertas del Atelier...</p> </div> ${renderScript($$result, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/login.astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
