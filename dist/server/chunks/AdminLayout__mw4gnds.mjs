import { e as createComponent, r as renderTemplate, o as renderSlot, g as addAttribute, l as renderHead, h as createAstro } from './astro/server_BtsvdxdT.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                             */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title, activeNav = "", user } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es" data-admin="true" data-astro-cid-2kanml4j> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', ' \u2014 Atelier Forever One</title><link rel="icon" type="image/png" href="/logo_circular.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">', '</head> <body data-astro-cid-2kanml4j> <div id="toast-container" data-astro-cid-2kanml4j></div> <aside class="sidebar" data-astro-cid-2kanml4j> <div class="sidebar-logo" data-astro-cid-2kanml4j> <div class="logo-icon" data-astro-cid-2kanml4j></div> <div class="logo-text" data-astro-cid-2kanml4j> <div class="logo-brand" data-astro-cid-2kanml4j>Forever <span data-astro-cid-2kanml4j>One</span></div> <div class="logo-sub" data-astro-cid-2kanml4j>Atelier Privado</div> </div> </div> <nav class="nav-section" data-astro-cid-2kanml4j> <p class="nav-label" data-astro-cid-2kanml4j>Gesti\xF3n</p> <a href="/admin/dashboard"', ' data-astro-cid-2kanml4j>Panel Principal</a> <a href="/admin/products"', ' data-astro-cid-2kanml4j>Inventario</a> <a href="/admin/subcategories"', ' data-astro-cid-2kanml4j>Categorizaci\xF3n</a> <a href="/admin/orders"', ' data-astro-cid-2kanml4j>Pedidos</a> <p class="nav-label" style="margin-top:1.5rem;" data-astro-cid-2kanml4j>Reportes</p> <a href="/admin/analytics"', ' data-astro-cid-2kanml4j>Anal\xEDticas Pro</a> <p class="nav-label" style="margin-top:1.5rem;" data-astro-cid-2kanml4j>Sistema</p> <a href="/" target="_blank" class="nav-item" data-astro-cid-2kanml4j>Ver Sitio P\xFAblico</a> </nav> <div class="sidebar-footer" data-astro-cid-2kanml4j> ', ' <form action="/admin/logout" method="POST" data-astro-cid-2kanml4j> <button type="submit" class="logout-btn" data-astro-cid-2kanml4j>Finalizar Sesi\xF3n</button> </form> </div> </aside> <main class="admin-main" data-astro-cid-2kanml4j> <header class="topbar" data-astro-cid-2kanml4j> <div class="topbar-left" data-astro-cid-2kanml4j> <button class="hamburger" onclick="toggleSidebar()" aria-label="Menu" data-astro-cid-2kanml4j> <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-2kanml4j> <line x1="5" y1="7" x2="19" y2="7" data-astro-cid-2kanml4j></line> <line x1="5" y1="12" x2="19" y2="12" data-astro-cid-2kanml4j></line> <line x1="5" y1="17" x2="19" y2="17" data-astro-cid-2kanml4j></line> </svg> </button> <h1 class="topbar-title" data-astro-cid-2kanml4j>', '</h1> </div> <span class="topbar-badge" data-astro-cid-2kanml4j>Nodo \u2014 ', '</span> </header> <section class="page-content" data-astro-cid-2kanml4j> ', ` </section> </main> <script>
    if (localStorage.getItem('sidebar-hidden') === 'true' && window.innerWidth > 1024) {
      document.body.classList.add('sidebar-hidden');
    }

    function toggleSidebar() {
      const body = document.body;
      if (window.innerWidth <= 1024) {
        body.classList.toggle('sidebar-mobile-open');
      } else {
        body.classList.toggle('sidebar-hidden');
        localStorage.setItem('sidebar-hidden', body.classList.contains('sidebar-hidden').toString());
      }
    }

    window.showToast = function(message, type = 'success') {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = 'atelier-toast';
      const icon = type === 'success' 
        ? \`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>\`
        : \`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\`;
      
      toast.innerHTML = \`<div style="color:var(--gold); display:flex;">\${icon}</div><div class="toast-msg">\${message}</div>\`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 400);
      }, 4000);
    };
  <\/script> </body> </html>`], ['<html lang="es" data-admin="true" data-astro-cid-2kanml4j> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', ' \u2014 Atelier Forever One</title><link rel="icon" type="image/png" href="/logo_circular.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">', '</head> <body data-astro-cid-2kanml4j> <div id="toast-container" data-astro-cid-2kanml4j></div> <aside class="sidebar" data-astro-cid-2kanml4j> <div class="sidebar-logo" data-astro-cid-2kanml4j> <div class="logo-icon" data-astro-cid-2kanml4j></div> <div class="logo-text" data-astro-cid-2kanml4j> <div class="logo-brand" data-astro-cid-2kanml4j>Forever <span data-astro-cid-2kanml4j>One</span></div> <div class="logo-sub" data-astro-cid-2kanml4j>Atelier Privado</div> </div> </div> <nav class="nav-section" data-astro-cid-2kanml4j> <p class="nav-label" data-astro-cid-2kanml4j>Gesti\xF3n</p> <a href="/admin/dashboard"', ' data-astro-cid-2kanml4j>Panel Principal</a> <a href="/admin/products"', ' data-astro-cid-2kanml4j>Inventario</a> <a href="/admin/subcategories"', ' data-astro-cid-2kanml4j>Categorizaci\xF3n</a> <a href="/admin/orders"', ' data-astro-cid-2kanml4j>Pedidos</a> <p class="nav-label" style="margin-top:1.5rem;" data-astro-cid-2kanml4j>Reportes</p> <a href="/admin/analytics"', ' data-astro-cid-2kanml4j>Anal\xEDticas Pro</a> <p class="nav-label" style="margin-top:1.5rem;" data-astro-cid-2kanml4j>Sistema</p> <a href="/" target="_blank" class="nav-item" data-astro-cid-2kanml4j>Ver Sitio P\xFAblico</a> </nav> <div class="sidebar-footer" data-astro-cid-2kanml4j> ', ' <form action="/admin/logout" method="POST" data-astro-cid-2kanml4j> <button type="submit" class="logout-btn" data-astro-cid-2kanml4j>Finalizar Sesi\xF3n</button> </form> </div> </aside> <main class="admin-main" data-astro-cid-2kanml4j> <header class="topbar" data-astro-cid-2kanml4j> <div class="topbar-left" data-astro-cid-2kanml4j> <button class="hamburger" onclick="toggleSidebar()" aria-label="Menu" data-astro-cid-2kanml4j> <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-2kanml4j> <line x1="5" y1="7" x2="19" y2="7" data-astro-cid-2kanml4j></line> <line x1="5" y1="12" x2="19" y2="12" data-astro-cid-2kanml4j></line> <line x1="5" y1="17" x2="19" y2="17" data-astro-cid-2kanml4j></line> </svg> </button> <h1 class="topbar-title" data-astro-cid-2kanml4j>', '</h1> </div> <span class="topbar-badge" data-astro-cid-2kanml4j>Nodo \u2014 ', '</span> </header> <section class="page-content" data-astro-cid-2kanml4j> ', ` </section> </main> <script>
    if (localStorage.getItem('sidebar-hidden') === 'true' && window.innerWidth > 1024) {
      document.body.classList.add('sidebar-hidden');
    }

    function toggleSidebar() {
      const body = document.body;
      if (window.innerWidth <= 1024) {
        body.classList.toggle('sidebar-mobile-open');
      } else {
        body.classList.toggle('sidebar-hidden');
        localStorage.setItem('sidebar-hidden', body.classList.contains('sidebar-hidden').toString());
      }
    }

    window.showToast = function(message, type = 'success') {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = 'atelier-toast';
      const icon = type === 'success' 
        ? \\\`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>\\\`
        : \\\`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\\\`;
      
      toast.innerHTML = \\\`<div style="color:var(--gold); display:flex;">\\\${icon}</div><div class="toast-msg">\\\${message}</div>\\\`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 400);
      }, 4000);
    };
  <\/script> </body> </html>`])), title, renderHead(), addAttribute(`nav-item ${activeNav === "dashboard" ? "active" : ""}`, "class"), addAttribute(`nav-item ${activeNav === "products" ? "active" : ""}`, "class"), addAttribute(`nav-item ${activeNav === "subcategories" ? "active" : ""}`, "class"), addAttribute(`nav-item ${activeNav === "orders" ? "active" : ""}`, "class"), addAttribute(`nav-item ${activeNav === "analytics" ? "active" : ""}`, "class"), user && renderTemplate`<span class="user-email" data-astro-cid-2kanml4j>${user.email}</span>`, title, title, renderSlot($$result, $$slots["default"]));
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
