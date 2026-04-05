import { c as createComponent } from './astro-component_D3bPY0Kc.mjs';
import 'piccolore';
import { Q as renderTemplate, B as maybeRenderHead, a3 as addAttribute } from './sequence_BZ_GwenZ.mjs';
import { r as renderComponent } from './entrypoint_RSxQFoUR.mjs';
import { r as renderScript } from './script_C8kPsTrl.mjs';
import { $ as $$AdminLayout } from './AdminLayout_CM0GIn_a.mjs';
import { s as supabase } from './supabase_CUGkxkOG.mjs';

const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
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
  const deliveryZones = settingsData?.find((s) => s.key === "delivery_zones")?.value || "Yuma, Güigüe";
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
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Panel Principal", "activeNav": "dashboard", "user": { email: user.email || "" }, "data-astro-cid-x6qnsptu": true }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<div class="welcome-banner" data-astro-cid-x6qnsptu> <p class="welcome-label" data-astro-cid-x6qnsptu>✦ Atelier Privado</p> <h2 class="welcome-title" data-astro-cid-x6qnsptu>Bienvenido, <span data-astro-cid-x6qnsptu>Administrador</span></h2> <p class="welcome-sub" data-astro-cid-x6qnsptu>Sistema Forever One · Todo está bajo control.</p> </div>  <div class="rate-card" data-astro-cid-x6qnsptu> <div class="rate-info" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>Tasa de Cambio Operativa (BCV + 1%)</h3> <div class="rate-value" data-astro-cid-x6qnsptu><span data-astro-cid-x6qnsptu>Bs.</span>${stats.bcvRate}</div> <p style="font-size: 9px; color: rgba(255,255,255,0.3); margin-top: 0.5rem; letter-spacing: 0.05em;" data-astro-cid-x6qnsptu>
Última actualización: ${stats.lastUpdate} </p> </div> <button id="sync-rate-btn" class="sync-btn" data-astro-cid-x6qnsptu>
↻ Sincronizar Ahora
</button> </div> ${renderScript($$result2, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/dashboard.astro?astro&type=script&index=0&lang.ts")}  <div class="stats-grid" data-astro-cid-x6qnsptu> <div class="stat-card" data-astro-cid-x6qnsptu> <p class="stat-label" data-astro-cid-x6qnsptu>Prendas Activas</p> <p class="stat-value" data-astro-cid-x6qnsptu>${stats.totalProducts}</p> <p class="stat-meta" data-astro-cid-x6qnsptu>En catálogo</p> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <p class="stat-label" data-astro-cid-x6qnsptu>Pedidos Pendientes</p> <p class="stat-value" data-astro-cid-x6qnsptu>${stats.pendingOrders}</p> <p class="stat-meta" data-astro-cid-x6qnsptu>Por confirmar</p> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <p class="stat-label" data-astro-cid-x6qnsptu>Subcategorías</p> <p class="stat-value" data-astro-cid-x6qnsptu>${stats.subcategories}</p> <p class="stat-meta" data-astro-cid-x6qnsptu>Clasificaciones</p> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <p class="stat-label" data-astro-cid-x6qnsptu>Stock Crítico</p> <p class="stat-value" data-astro-cid-x6qnsptu>${stats.lowStock}</p> <p class="stat-meta" data-astro-cid-x6qnsptu>Bajo mínimo</p> </div> </div>  <p class="section-label" data-astro-cid-x6qnsptu>Gestión de Entregas</p> <div class="settings-card" data-astro-cid-x6qnsptu> <div class="toggle-group" data-astro-cid-x6qnsptu> <input type="checkbox" id="delivery-toggle"${addAttribute(stats.deliveryEnabled, "checked")} class="w-5 h-5 accent-[#B8860B]" data-astro-cid-x6qnsptu> <label for="delivery-toggle" class="form-label" style="margin-bottom:0" data-astro-cid-x6qnsptu>Habilitar Delivery local</label> </div> <div class="form-group" data-astro-cid-x6qnsptu> <label class="form-label" data-astro-cid-x6qnsptu>Zonas de Reparto (Separadas por coma)</label> <textarea id="delivery-zones-input" class="form-input" rows="3" placeholder="Ej: Yuma, Güigüe, San Joaquín" data-astro-cid-x6qnsptu>${stats.deliveryZones}</textarea> </div> <button id="save-settings-btn" class="save-btn" data-astro-cid-x6qnsptu>Guardar Cambios</button> </div>  <p class="section-label" data-astro-cid-x6qnsptu>Acciones Rápidas</p> <div class="actions-grid" data-astro-cid-x6qnsptu> <a href="/admin/products/new" class="action-card" data-astro-cid-x6qnsptu> <div class="action-icon" data-astro-cid-x6qnsptu>✦</div> <p class="action-name" data-astro-cid-x6qnsptu>Nueva Prenda</p> <p class="action-desc" data-astro-cid-x6qnsptu>Añadir al catálogo exclusivo</p> </a> <a href="/admin/subcategories" class="action-card" data-astro-cid-x6qnsptu> <div class="action-icon" data-astro-cid-x6qnsptu>◈</div> <p class="action-name" data-astro-cid-x6qnsptu>Subcategorías</p> <p class="action-desc" data-astro-cid-x6qnsptu>Gestionar clasificaciones</p> </a> <a href="/admin/orders" class="action-card" data-astro-cid-x6qnsptu> <div class="action-icon" data-astro-cid-x6qnsptu>📦</div> <p class="action-name" data-astro-cid-x6qnsptu>Ver Pedidos</p> <p class="action-desc" data-astro-cid-x6qnsptu>Gestionar órdenes recibidas</p> </a> </div>  <div class="status-bar" data-astro-cid-x6qnsptu> <div class="status-dot" data-astro-cid-x6qnsptu></div>
Sistema Forever One — Conectado a Supabase. Todas las funciones operativas.
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
