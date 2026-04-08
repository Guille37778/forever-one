import { e as createComponent, i as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, k as renderScript, u as unescapeHTML, g as addAttribute } from '../../chunks/astro/server_BtsvdxdT.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout__mw4gnds.mjs';
import { s as supabase } from '../../chunks/supabase_FqJk9_vE.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) return Astro2.redirect("/admin/login");
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) return Astro2.redirect("/admin/login");
  const { count: totalProducts } = await supabase.from("products").select("*", { count: "exact", head: true });
  const { count: lowStock } = await supabase.from("variants").select("*", { count: "exact", head: true }).lt("stock_quantity", 5);
  const { count: pendingOrders } = await supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "verificando");
  const { count: totalSubcategories } = await supabase.from("subcategories").select("*", { count: "exact", head: true });
  const { data: settingsData } = await supabase.from("site_settings").select("*").in("key", ["bcv_usd_rate", "delivery_enabled", "delivery_zones"]);
  const rateData = settingsData?.find((s) => s.key === "bcv_usd_rate");
  const deliveryEnabled = settingsData?.find((s) => s.key === "delivery_enabled")?.value === "true";
  const deliveryZones = settingsData?.find((s) => s.key === "delivery_zones")?.value || "Yuma, G\xFCig\xFCe";
  const stats = {
    totalProducts: totalProducts || 0,
    pendingOrders: pendingOrders || 0,
    lowStock: lowStock || 0,
    subcategories: totalSubcategories || 0,
    bcvRate: rateData?.value || "0.00",
    lastUpdate: rateData?.updated_at ? new Date(rateData.updated_at).toLocaleString("es-VE") : "Nunca",
    deliveryEnabled,
    deliveryZones
  };
  const Icons = {
    Garment: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.62 1.96V10a6 6 0 0012 0V5.41"/><path d="M12 21V10"/></svg>`,
    Shipping: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16h6v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4h6"/><path d="M20 16v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4"/><path d="M12 16V10"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>`,
    Layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    Alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>`,
    Plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Panel Principal", "activeNav": "dashboard", "user": { email: user.email || "" }, "data-astro-cid-x6qnsptu": true }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<div class="welcome-banner" data-astro-cid-x6qnsptu> <p class="welcome-label" data-astro-cid-x6qnsptu>✦ Atelier Privado</p> <h2 class="welcome-title" data-astro-cid-x6qnsptu>Bienvenida, <span data-astro-cid-x6qnsptu>Nazareth</span></h2> <p class="welcome-sub" data-astro-cid-x6qnsptu>Sistema Forever One · Gestión y Control de Alta Gama.</p> </div>  <div class="rate-card" data-astro-cid-x6qnsptu> <div class="rate-info" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>Tasa de Cambio Operativa (BCV + 1%)</h3> <div class="rate-value" data-astro-cid-x6qnsptu><span data-astro-cid-x6qnsptu>Bs.</span>${stats.bcvRate}</div> <p style="font-size: 9px; color: rgba(255,255,255,0.3); margin-top: 0.75rem; letter-spacing: 0.1em;" data-astro-cid-x6qnsptu>
ULTIMA SINCRONIZACION: ${stats.lastUpdate} </p> </div> <button id="sync-rate-btn" class="sync-btn" data-astro-cid-x6qnsptu>↻ Sincronizar Ahora</button> </div> ${renderScript($$result2, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/dashboard.astro?astro&type=script&index=0&lang.ts")}  <div class="stats-grid" data-astro-cid-x6qnsptu> <div class="stat-card" data-astro-cid-x6qnsptu> <div class="stat-icon-box" data-astro-cid-x6qnsptu>${unescapeHTML(Icons.Garment)}</div> <p class="stat-label" data-astro-cid-x6qnsptu>Prendas Activas</p> <p class="stat-value" data-astro-cid-x6qnsptu>${stats.totalProducts}</p> <p class="stat-meta" data-astro-cid-x6qnsptu>En catálogo</p> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <div class="stat-icon-box" data-astro-cid-x6qnsptu>${unescapeHTML(Icons.Shipping)}</div> <p class="stat-label" data-astro-cid-x6qnsptu>Pedidos Pendientes</p> <p class="stat-value" data-astro-cid-x6qnsptu>${stats.pendingOrders}</p> <p class="stat-meta" data-astro-cid-x6qnsptu>En verificación</p> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <div class="stat-icon-box" data-astro-cid-x6qnsptu>${unescapeHTML(Icons.Layers)}</div> <p class="stat-label" data-astro-cid-x6qnsptu>Subcategorías</p> <p class="stat-value" data-astro-cid-x6qnsptu>${stats.subcategories}</p> <p class="stat-meta" data-astro-cid-x6qnsptu>Organizadas</p> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <div class="stat-icon-box" data-astro-cid-x6qnsptu>${unescapeHTML(Icons.Alert)}</div> <p class="stat-label" data-astro-cid-x6qnsptu>Stock Crítico</p> <p class="stat-value" data-astro-cid-x6qnsptu>${stats.lowStock}</p> <p class="stat-meta" data-astro-cid-x6qnsptu>Reponer pronto</p> </div> </div>  <p class="section-label" data-astro-cid-x6qnsptu>Ajustes de Entrega</p> <div class="settings-card shadow-sm" style="background:white; border-radius:16px; padding:2rem; border: 1px solid rgba(0,0,0,0.04);" data-astro-cid-x6qnsptu> <div class="toggle-group" style="display:flex; align-items:center; gap:1.5rem; margin-bottom:2rem;" data-astro-cid-x6qnsptu> <input type="checkbox" id="delivery-toggle"${addAttribute(stats.deliveryEnabled, "checked")} style="width:24px; height:24px; cursor:pointer;" class="accent-[#B8860B]" data-astro-cid-x6qnsptu> <label for="delivery-toggle" style="font-size:10px; text-transform:uppercase; letter-spacing: 0.2em; color:#111; font-weight:700; cursor:pointer;" data-astro-cid-x6qnsptu>Habilitar Delivery local</label> </div> <div class="form-group" style="margin-bottom:2rem;" data-astro-cid-x6qnsptu> <label style="display:block; font-size:8px; text-transform:uppercase; letter-spacing:0.3em; color:#aaa; margin-bottom:0.75rem; font-weight:700;" data-astro-cid-x6qnsptu>Zonas de Reparto Operativas</label> <textarea id="delivery-zones-input" style="width:100%; min-height:100px; padding:1.25rem; background:#fcfcfc; border:1px solid #f0f0f0; border-radius:12px; font-size:13px; font-family:inherit; outline:none; transition: all 0.3s;" onfocus="this.style.borderColor='#B8860B'; this.style.background='white';" data-astro-cid-x6qnsptu>${stats.deliveryZones}</textarea> </div> <button id="save-settings-btn" class="save-btn" style="background:#111; color:#B8860B; border:1px solid #222; padding:1.15rem; font-size:9px; letter-spacing:0.4em; text-transform:uppercase; font-weight:800; border-radius:12px; cursor:pointer; width:100%; transition:all 0.3s;" data-astro-cid-x6qnsptu>Confirmar Cambios</button> </div>  <p class="section-label" data-astro-cid-x6qnsptu>Gestión Rápida</p> <div class="actions-grid" data-astro-cid-x6qnsptu> <a href="/admin/products/new" class="action-card" data-astro-cid-x6qnsptu> <div class="action-icon" data-astro-cid-x6qnsptu>${unescapeHTML(Icons.Plus)}</div> <div class="action-info" data-astro-cid-x6qnsptu> <p class="action-name" data-astro-cid-x6qnsptu>Nueva Prenda</p> <p class="action-desc" data-astro-cid-x6qnsptu>Añadir al Atelier</p> </div> </a> <a href="/admin/subcategories" class="action-card" data-astro-cid-x6qnsptu> <div class="action-icon" data-astro-cid-x6qnsptu>${unescapeHTML(Icons.Layers)}</div> <div class="action-info" data-astro-cid-x6qnsptu> <p class="action-name" data-astro-cid-x6qnsptu>Categorización</p> <p class="action-desc" data-astro-cid-x6qnsptu>Gestionar Estilos</p> </div> </a> <a href="/admin/orders" class="action-card" data-astro-cid-x6qnsptu> <div class="action-icon" data-astro-cid-x6qnsptu>${unescapeHTML(Icons.Shipping)}</div> <div class="action-info" data-astro-cid-x6qnsptu> <p class="action-name" data-astro-cid-x6qnsptu>Ver Pedidos</p> <p class="action-desc" data-astro-cid-x6qnsptu>Panel de Compras</p> </div> </a> </div>  <div class="status-bar" data-astro-cid-x6qnsptu> <div style="width:8px; height:8px; border-radius:50%; background:#B8860B; box-shadow:0 0 10px rgba(184,134,11,0.5); animation: pulse 2s infinite;" data-astro-cid-x6qnsptu></div>
SISTEMA FOREVER ONE — ESTADO: ACTIVO · SESIÓN DE ADMINISTRADOR CIFRADA
</div> ` })}`;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/dashboard.astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
