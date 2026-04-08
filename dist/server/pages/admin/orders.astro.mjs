import { e as createComponent, r as renderTemplate, i as renderComponent, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_BtsvdxdT.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout__mw4gnds.mjs';
import { s as supabase, a as supabaseAdmin } from '../../chunks/supabase_FqJk9_vE.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) return Astro2.redirect("/admin/login");
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) return Astro2.redirect("/admin/login");
  const { data: ordersData } = await supabaseAdmin.from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
  const statusColors = {
    verificando: { bg: "rgba(74,144,226,0.08)", text: "#4A90E2", border: "rgba(74,144,226,0.2)" },
    preparando: { bg: "rgba(245,166,35,0.08)", text: "#E59B10", border: "rgba(245,166,35,0.2)" },
    enviado: { bg: "rgba(37,211,102,0.08)", text: "#1a9e50", border: "rgba(37,211,102,0.2)" },
    entregado: { bg: "rgba(184,134,11,0.08)", text: "#B8860B", border: "rgba(184,134,11,0.2)" },
    cancelado: { bg: "rgba(220,38,38,0.08)", text: "#dc2626", border: "rgba(220,38,38,0.2)" }
  };
  return renderTemplate(_a || (_a = __template(["", " <script>\n  async function handleStatus(orderId, newStatus) {\n    if (!confirm(`\xBFCambiar estado a \"${newStatus}\"?`)) return;\n    try {\n      const res = await fetch(`/api/orders/${orderId}/status`, {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ status: newStatus })\n      });\n      if (res.ok) window.location.reload();\n      else alert('Error al actualizar el estado');\n    } catch (e) {\n      alert('Error de conexi\xF3n');\n    }\n  }\n<\/script>"], ["", " <script>\n  async function handleStatus(orderId, newStatus) {\n    if (!confirm(\\`\xBFCambiar estado a \"\\${newStatus}\"?\\`)) return;\n    try {\n      const res = await fetch(\\`/api/orders/\\${orderId}/status\\`, {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ status: newStatus })\n      });\n      if (res.ok) window.location.reload();\n      else alert('Error al actualizar el estado');\n    } catch (e) {\n      alert('Error de conexi\xF3n');\n    }\n  }\n<\/script>"])), renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Pedidos", "activeNav": "orders", "user": { email: user.email || "" }, "data-astro-cid-clasxzqm": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="page-header" data-astro-cid-clasxzqm> <p data-astro-cid-clasxzqm>Gestión Comercial</p> <h2 data-astro-cid-clasxzqm>Registro de Pedidos</h2> </div> ${ordersData && ordersData.length > 0 ? ordersData.map((order) => {
    const sc = statusColors[order.status] || statusColors.verificando;
    return renderTemplate`<div class="order-card" data-astro-cid-clasxzqm> <div class="order-header" data-astro-cid-clasxzqm> <div style="display:flex; align-items:center;" data-astro-cid-clasxzqm> <span class="order-code" data-astro-cid-clasxzqm>${order.order_code}</span> <span class="order-date" data-astro-cid-clasxzqm>${new Date(order.created_at).toLocaleString("es-VE")}</span> </div> <span class="status-badge"${addAttribute(`background:${sc.bg}; color:${sc.text}; border: 1px solid ${sc.border};`, "style")} data-astro-cid-clasxzqm> ${order.status} </span> </div> <div class="order-body" data-astro-cid-clasxzqm> <div data-astro-cid-clasxzqm> <p class="info-label" data-astro-cid-clasxzqm>Datos del Cliente</p> <p class="info-row" data-astro-cid-clasxzqm><strong data-astro-cid-clasxzqm>${order.customer_name}</strong></p> <p class="info-row" data-astro-cid-clasxzqm>${order.customer_email}</p> <p class="info-row" data-astro-cid-clasxzqm>${order.customer_phone}</p> <p class="info-row" data-astro-cid-clasxzqm>📍 ${order.city} · ${order.courier?.toUpperCase()}</p> </div> <div data-astro-cid-clasxzqm> <p class="info-label" data-astro-cid-clasxzqm>Prendas del Pedido</p> <ul class="items-list" data-astro-cid-clasxzqm> ${order.order_items?.map((item) => renderTemplate`<li data-astro-cid-clasxzqm> <span data-astro-cid-clasxzqm>${item.product_name} (x${item.quantity}) — ${item.size}</span> <strong data-astro-cid-clasxzqm>$${item.price_usd}</strong> </li>`)} </ul> <p class="price-total" data-astro-cid-clasxzqm>Total: <span data-astro-cid-clasxzqm>$${order.total_usd}</span></p> </div> </div> <div class="order-actions" data-astro-cid-clasxzqm> <button class="action-btn"${addAttribute(`handleStatus('${order.id}', 'preparando')`, "onclick")} data-astro-cid-clasxzqm> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-clasxzqm> <rect x="2" y="5" width="20" height="14" rx="2" data-astro-cid-clasxzqm></rect> <line x1="2" y1="10" x2="22" y2="10" data-astro-cid-clasxzqm></line> </svg>
Confirmar Pago
</button> <button class="action-btn"${addAttribute(`handleStatus('${order.id}', 'enviado')`, "onclick")} data-astro-cid-clasxzqm> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-clasxzqm> <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-astro-cid-clasxzqm></path> <polyline points="3.27 6.96 12 12.01 20.73 6.96" data-astro-cid-clasxzqm></polyline> <line x1="12" y1="22.08" x2="12" y2="12" data-astro-cid-clasxzqm></line> </svg>
Marcar Enviado
</button> <a${addAttribute(`https://wa.me/${order.customer_phone?.replace(/[ +]/g, "")}`, "href")} target="_blank" class="action-btn wa" data-astro-cid-clasxzqm> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-clasxzqm> <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" data-astro-cid-clasxzqm></path> </svg>
WhatsApp
</a> </div> </div>`;
  }) : renderTemplate`<div class="empty-state" data-astro-cid-clasxzqm> <p data-astro-cid-clasxzqm>No hay pedidos registrados aún</p> </div>`}` }));
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/orders/index.astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/orders/index.astro";
const $$url = "/admin/orders";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
