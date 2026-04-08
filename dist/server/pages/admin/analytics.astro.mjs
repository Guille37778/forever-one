import { e as createComponent, r as renderTemplate, j as defineScriptVars, i as renderComponent, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_BtsvdxdT.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout__mw4gnds.mjs';
import { s as supabase, a as supabaseAdmin } from '../../chunks/supabase_FqJk9_vE.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Analytics = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Analytics;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) return Astro2.redirect("/admin/login");
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) return Astro2.redirect("/admin/login");
  const { data: analyticsData } = await supabaseAdmin.from("product_stats").select("*, products(name, price)").order("views", { ascending: false });
  const { data: ordersData } = await supabaseAdmin.from("orders").select("total_usd");
  const { data: orderItemsData } = await supabaseAdmin.from("order_items").select("product_id, product_name, quantity");
  const totalViews = analyticsData?.reduce((s, i) => s + (i.views || 0), 0) || 0;
  analyticsData?.reduce((s, i) => s + (i.whatsapp_clicks || 0), 0) || 0;
  const totalRevenue = ordersData?.reduce((s, i) => s + Number(i.total_usd || 0), 0) || 0;
  const totalOrders = ordersData?.length || 0;
  const salesMap = {};
  const namesMap = {};
  orderItemsData?.forEach((item) => {
    salesMap[item.product_id] = (salesMap[item.product_id] || 0) + (item.quantity || 0);
    namesMap[item.product_id] = item.product_name;
  });
  const statsMap = {};
  analyticsData?.forEach((item) => {
    statsMap[item.product_id] = item;
    namesMap[item.product_id] = item.products?.name || namesMap[item.product_id] || "Prenda Desconocida";
  });
  const allProductIds = Array.from(/* @__PURE__ */ new Set([
    ...analyticsData?.map((i) => i.product_id) || [],
    ...orderItemsData?.map((i) => i.product_id) || []
  ]));
  const processedData = allProductIds.map((id) => {
    const stat = statsMap[id] || {};
    const sales = salesMap[id] || 0;
    return {
      product_id: id,
      products: { name: namesMap[id] },
      views: stat.views || 0,
      whatsapp_clicks: stat.whatsapp_clicks || 0,
      sales
    };
  }).sort((a, b) => {
    const scoreA = a.views + a.whatsapp_clicks * 10 + a.sales * 50;
    const scoreB = b.views + b.whatsapp_clicks * 10 + b.sales * 50;
    return scoreB - scoreA;
  });
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", "\n  // Reset Analytics Logic\n  document.getElementById('resetAnalyticsBtn')?.addEventListener('click', async () => {\n    if (confirm('\xBFEst\xE1s seguro de que quieres borrar la anal\xEDtica y el an\xE1lisis de estad\xEDsticas?')) {\n      try {\n        const res = await fetch('/api/stats/reset', { method: 'POST' });\n        if (res.ok) window.location.reload();\n        else alert('Error al reiniciar anal\xEDticas');\n      } catch (e) {\n        alert('Error de conexi\xF3n');\n      }\n    }\n  });\n\n  // Chart.js via CDN\n  const script = document.createElement('script');\n  script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js';\n  script.onload = () => {\n    const data = analyticsData || [];\n    if (!data.length) return;\n\n    const palette = ['#B8860B','#f3cf7a','#8B6508','#FFD700','#CDA333'];\n    const labels = data.map(d => d.products?.name || 'Prenda');\n    const views  = data.map(d => d.views || 0);\n    const wa     = data.map(d => d.whatsapp_clicks || 0);\n\n    const barCtx = document.getElementById('viewsBarChart')?.getContext('2d');\n    if (barCtx) {\n      new Chart(barCtx, {\n        type: 'bar',\n        data: {\n          labels,\n          datasets: [{ label: 'Vistas', data: views, backgroundColor: palette }]\n        },\n        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }\n      });\n    }\n\n    const donutCtx = document.getElementById('heatDoughnutChart')?.getContext('2d');\n    if (donutCtx) {\n      new Chart(donutCtx, {\n        type: 'doughnut',\n        data: {\n          labels,\n          datasets: [{ data: wa.length && wa.some(v => v > 0) ? wa : views, backgroundColor: palette }]\n        },\n        options: { responsive: true, maintainAspectRatio: false, cutout: '70%' }\n      });\n    }\n  };\n  document.head.appendChild(script);\n})();<\/script>"])), renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Anal\xEDticas", "activeNav": "analytics", "user": { email: user?.email || "" }, "data-astro-cid-5a6mzon6": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="analytics-header" data-astro-cid-5a6mzon6> <div data-astro-cid-5a6mzon6> <p style="font-size: 8px; letter-spacing: 0.4em; text-transform: uppercase; color: #B8860B; font-weight: 700; margin-bottom: 4px;" data-astro-cid-5a6mzon6>Información General</p> <h2 style="font-family: 'Playfair Display', serif; font-size: 1.75rem; font-weight: 900; font-style: italic; color: #111;" data-astro-cid-5a6mzon6>Métricas de Rendimiento</h2> </div> <button id="resetAnalyticsBtn" class="reset-btn" data-astro-cid-5a6mzon6>
Reiniciar Análisis ✦
</button> </div> <div class="kpi-grid" data-astro-cid-5a6mzon6> <div class="kpi-card" data-astro-cid-5a6mzon6> <div class="kpi-icon-box" data-astro-cid-5a6mzon6> <svg width="18" height="18" fill="none" stroke="#B8860B" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-5a6mzon6> <rect x="2" y="6" width="20" height="12" rx="2" data-astro-cid-5a6mzon6></rect> <circle cx="12" cy="12" r="2" data-astro-cid-5a6mzon6></circle> <path d="M6 12h.01M18 12h.01" data-astro-cid-5a6mzon6></path> </svg> </div> <p class="kpi-label" data-astro-cid-5a6mzon6>Ingresos Totales</p> <p class="kpi-value" data-astro-cid-5a6mzon6>$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p> <p class="kpi-sub" data-astro-cid-5a6mzon6>Ventas confirmadas (USD)</p> </div> <div class="kpi-card" data-astro-cid-5a6mzon6> <div class="kpi-icon-box" data-astro-cid-5a6mzon6> <svg width="18" height="18" fill="none" stroke="#B8860B" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-5a6mzon6> <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" data-astro-cid-5a6mzon6></path> <line x1="3" y1="6" x2="21" y2="6" data-astro-cid-5a6mzon6></line> <path d="M16 10a4 4 0 0 1-8 0" data-astro-cid-5a6mzon6></path> </svg> </div> <p class="kpi-label" data-astro-cid-5a6mzon6>Pedidos</p> <p class="kpi-value" data-astro-cid-5a6mzon6>${totalOrders}</p> <p class="kpi-sub" data-astro-cid-5a6mzon6>Conversiones totales</p> </div> <div class="kpi-card" data-astro-cid-5a6mzon6> <div class="kpi-icon-box" data-astro-cid-5a6mzon6> <svg width="18" height="18" fill="none" stroke="#B8860B" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-5a6mzon6> <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" data-astro-cid-5a6mzon6></path> <circle cx="12" cy="12" r="3" data-astro-cid-5a6mzon6></circle> </svg> </div> <p class="kpi-label" data-astro-cid-5a6mzon6>Vistas Totales</p> <p class="kpi-value" data-astro-cid-5a6mzon6>${totalViews.toLocaleString()}</p> <p class="kpi-sub" data-astro-cid-5a6mzon6>Alcance de marca</p> </div> </div> <div class="charts-grid" data-astro-cid-5a6mzon6> <div class="chart-card" data-astro-cid-5a6mzon6> <p class="chart-heading" data-astro-cid-5a6mzon6>Distribución de Vistas</p> <div class="chart-wrap" data-astro-cid-5a6mzon6><canvas id="viewsBarChart" data-astro-cid-5a6mzon6></canvas></div> </div> <div class="chart-card" data-astro-cid-5a6mzon6> <p class="chart-heading" data-astro-cid-5a6mzon6>WhatsApp vs Vistas</p> <div class="chart-wrap" data-astro-cid-5a6mzon6><canvas id="heatDoughnutChart" data-astro-cid-5a6mzon6></canvas></div> </div> </div> <div class="stats-container" data-astro-cid-5a6mzon6> <div style="margin-bottom:1.5rem;" data-astro-cid-5a6mzon6> <p style="font-size:8px; letter-spacing:0.4em; text-transform:uppercase; color:#999; font-weight:700; margin-bottom:2px;" data-astro-cid-5a6mzon6>Detalle por</p> <p style="font-family:'Playfair Display',serif; font-size:1.1rem; font-style:italic; color:#111;" data-astro-cid-5a6mzon6>Rendimiento de Prendas</p> </div> ${processedData && processedData.length > 0 ? renderTemplate`<div class="desktop-table-card" data-astro-cid-5a6mzon6> <table data-astro-cid-5a6mzon6> <thead data-astro-cid-5a6mzon6> <tr data-astro-cid-5a6mzon6> <th data-astro-cid-5a6mzon6>Prenda</th> <th data-astro-cid-5a6mzon6>Vistas</th> <th data-astro-cid-5a6mzon6>Ventas</th> <th data-astro-cid-5a6mzon6>WhatsApp</th> <th data-astro-cid-5a6mzon6>Temperatura</th> </tr> </thead> <tbody data-astro-cid-5a6mzon6> ${processedData.map((item) => {
    const heatScore = (item.views || 0) + (item.whatsapp_clicks || 0) * 10 + (item.sales || 0) * 50;
    const heat = Math.min(heatScore / 200 * 100, 100);
    return renderTemplate`<tr data-astro-cid-5a6mzon6> <td data-astro-cid-5a6mzon6> <div style="font-weight:800; color:#111;" data-astro-cid-5a6mzon6>${item.products?.name}</div> <div style="font-size:9px; color:#bbb;" data-astro-cid-5a6mzon6>ID: ${item.product_id?.substring(0, 8)}</div> </td> <td data-astro-cid-5a6mzon6><span class="badge" data-astro-cid-5a6mzon6>${item.views} vistas</span></td> <td data-astro-cid-5a6mzon6><span class="badge" style="background:#111; color:#f3cf7a;" data-astro-cid-5a6mzon6>${item.sales} und</span></td> <td data-astro-cid-5a6mzon6><span class="badge badge-green" data-astro-cid-5a6mzon6>${item.whatsapp_clicks} clics</span></td> <td style="min-width:120px;" data-astro-cid-5a6mzon6> <div style="display:flex; align-items:center; gap:8px;" data-astro-cid-5a6mzon6> <div class="heat-minimal" style="flex:1;" data-astro-cid-5a6mzon6><div class="heat-minimal-fill"${addAttribute(`width:${heat}%`, "style")} data-astro-cid-5a6mzon6></div></div> <span style="font-size:10px; font-weight:800; color:#B8860B;" data-astro-cid-5a6mzon6>${Math.round(heat)}%</span> </div> </td> </tr>`;
  })} </tbody> </table> </div>` : renderTemplate`<div class="kpi-card" style="text-align:center; padding:4rem;" data-astro-cid-5a6mzon6> <p class="kpi-label" data-astro-cid-5a6mzon6>Sin datos de interacción aún</p> </div>`} </div> ` }), defineScriptVars({ analyticsData: processedData }));
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/analytics.astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/analytics.astro";
const $$url = "/admin/analytics";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Analytics,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
