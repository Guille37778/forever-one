import { c as createComponent } from './astro-component_D3bPY0Kc.mjs';
import 'piccolore';
import { b9 as renderHead, a3 as addAttribute, Q as renderTemplate } from './sequence_BZ_GwenZ.mjs';
import 'clsx';
import { s as supabase } from './supabase_CUGkxkOG.mjs';

const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Register;
  const sessionCookie = Astro2.cookies.get("sb-access-token")?.value;
  if (sessionCookie) {
    const { data: { user } } = await supabase.auth.getUser(sessionCookie);
    if (user) return Astro2.redirect("/admin/dashboard");
  }
  let message = "";
  let messageType = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    if (email && password) {
      const { data: { session }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${Astro2.url.origin}/admin/login`
        }
      });
      if (error) {
        console.error("Registration Error:", error);
        message = `Error: ${error.message}`;
        messageType = "error";
      } else if (!session) {
        message = "Registro iniciado. Por favor, confirma tu email (revisa tu spam o actívalo manualmente en el panel de Supabase).";
        messageType = "success";
      } else {
        Astro2.cookies.set("sb-access-token", session.access_token, {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          secure: Astro2.url.protocol === "https:",
          maxAge: 60 * 60 * 24 * 7
        });
        Astro2.cookies.set("sb-refresh-token", session.refresh_token, {
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
  return renderTemplate`<html lang="es" data-astro-cid-u26ovtac> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Registrar Administrador — Forever One</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;1,400&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-u26ovtac> <div class="container" data-astro-cid-u26ovtac> <div class="logo-mark" data-astro-cid-u26ovtac>FO</div> <h1 data-astro-cid-u26ovtac>Crear Cuenta Administrador</h1> <p class="subtitle" data-astro-cid-u26ovtac>Atelier Privado · Forever One</p> ${message && renderTemplate`<div${addAttribute(`message ${messageType}`, "class")} data-astro-cid-u26ovtac>${message}</div>`} <form method="POST" data-astro-cid-u26ovtac> <div class="form-group" data-astro-cid-u26ovtac> <label for="email" data-astro-cid-u26ovtac>Email</label> <input type="email" id="email" name="email" placeholder="tu@correo.com" required data-astro-cid-u26ovtac> </div> <div class="form-group" data-astro-cid-u26ovtac> <label for="password" data-astro-cid-u26ovtac>Contraseña</label> <input type="password" id="password" name="password" placeholder="Minimo 6 caracteres" required minlength="6" data-astro-cid-u26ovtac> </div> <button type="submit" data-astro-cid-u26ovtac>Iniciar Registro</button> </form> <div class="nav-links" data-astro-cid-u26ovtac>
¿Ya tienes una cuenta? <a href="/admin/login" data-astro-cid-u26ovtac>Inicia sesión aquí</a> </div> </div> </body></html>`;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/register.astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/register.astro";
const $$url = "/admin/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
