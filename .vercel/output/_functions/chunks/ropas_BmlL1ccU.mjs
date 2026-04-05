import { c as createComponent } from './astro-component_D3bPY0Kc.mjs';
import 'piccolore';
import { Q as renderTemplate, a3 as addAttribute, B as maybeRenderHead } from './sequence_BZ_GwenZ.mjs';
import { r as renderComponent } from './entrypoint_RSxQFoUR.mjs';
import { r as renderScript } from './script_C8kPsTrl.mjs';
import { $ as $$Layout, b as $$Footer, a as $$Header } from './Footer_VeF1TjVC.mjs';
import { $ as $$Hero } from './Hero_DyQ026Rf.mjs';
import { s as supabase } from './supabase_CUGkxkOG.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Ropas = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Ropas;
  const { data: settingsData } = await supabase.from("site_settings").select("*").in("key", ["bcv_usd_rate", "delivery_enabled", "delivery_zones"]);
  const dollarRate = parseFloat(settingsData?.find((s) => s.key === "bcv_usd_rate")?.value || "0");
  const deliveryEnabled = settingsData?.find((s) => s.key === "delivery_enabled")?.value === "true";
  const deliveryZones = settingsData?.find((s) => s.key === "delivery_zones")?.value || "";
  const { data: initialProducts } = await supabase.from("products").select(`
    *,
    collections(name),
    subcategories(name, slug),
    variants(*)
  `).eq("is_active", true);
  const products = initialProducts?.map((p) => ({
    id: p.id,
    nombre: p.name,
    precio: p.price,
    imagen: p.image_urls?.[0] || "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=400",
    category: p.category || "ropa",
    subcategory_slug: p.subcategories?.slug || "",
    subcategory_name: p.subcategories?.name || "",
    categoria_label: p.category === "accesorios" ? "Accesorios" : "Ropa",
    coleccion: p.collections?.name || "",
    descripcion: p.description,
    stock: p.variants?.reduce((acc, v) => acc + v.stock_quantity, 0) || 0,
    variants: p.variants
  })) || [];
  const urlCat = Astro2.url.searchParams.get("cat");
  const urlSub = Astro2.url.searchParams.get("sub");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Forever One | Prendas & Colecciones", "data-astro-cid-cuzcz5z4": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", " ", '<main id="ropas-page" class="relative" data-astro-cid-cuzcz5z4> ', ' <!-- Alpine.js wrapper — deferred until after script is defined --> <div id="shop-root"', "", "", "", "", "", ` data-astro-cid-cuzcz5z4> <section class="py-24 bg-[#FAF9F6]" data-astro-cid-cuzcz5z4> <div class="max-w-7xl mx-auto px-6" data-astro-cid-cuzcz5z4> <!-- Búsqueda Premium --> <div class="max-w-xl mx-auto mb-12" data-aos="fade-up" data-astro-cid-cuzcz5z4> <div class="relative group" data-astro-cid-cuzcz5z4> <input type="text" id="search-input" placeholder="Buscar su próxima prenda..." oninput="window.__setSearch(this.value)" class="w-full bg-white text-black border border-gold/20 py-5 pl-14 pr-6 text-xs uppercase tracking-[0.3em] font-black italic outline-none transition-all duration-500 focus:border-gold focus:shadow-[0_0_20px_rgba(184,134,11,0.1)] placeholder:text-slate-300" data-astro-cid-cuzcz5z4> <div class="absolute left-6 top-1/2 -translate-y-1/2 text-gold/40 group-focus-within:text-gold transition-colors duration-500" data-astro-cid-cuzcz5z4> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-astro-cid-cuzcz5z4></path> </svg> </div> </div> </div> <!-- Categorías --> <div class="flex flex-wrap justify-center gap-6 mb-20" data-astro-cid-cuzcz5z4> <button onclick="window.__setCategory('Todos')" id="cat-btn-todos" class="cat-btn active px-6 py-2 border-b-2 border-gold text-gold text-[9px] uppercase tracking-[0.6em] font-black transition-all duration-500" data-astro-cid-cuzcz5z4>
Todos
</button> <button onclick="window.__setCategory('ropa')" id="cat-btn-ropa" class="cat-btn px-6 py-2 border-b-2 border-transparent text-slate-400 hover:text-black text-[9px] uppercase tracking-[0.6em] font-black transition-all duration-500" data-astro-cid-cuzcz5z4>
Ropa
</button> <button onclick="window.__setCategory('accesorios')" id="cat-btn-accesorios" class="cat-btn px-6 py-2 border-b-2 border-transparent text-slate-400 hover:text-black text-[9px] uppercase tracking-[0.6em] font-black transition-all duration-500" data-astro-cid-cuzcz5z4>
Accesorios
</button> </div> <!-- Grid Editorial --> <div id="product-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16 min-h-[500px]" data-astro-cid-cuzcz5z4> <!-- JS will populate this --> </div> <div id="loading-spinner" class="flex justify-center py-20" data-astro-cid-cuzcz5z4> <div class="w-12 h-12 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" data-astro-cid-cuzcz5z4></div> </div> <div id="empty-state" class="hidden text-center py-32 opacity-80 italic" data-astro-cid-cuzcz5z4> <div class="max-w-xs mx-auto" data-astro-cid-cuzcz5z4> <svg class="w-12 h-12 mx-auto mb-6 text-gold/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-cuzcz5z4></path> </svg> <p id="empty-state-msg" class="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 mb-4" data-astro-cid-cuzcz5z4>No hay productos disponibles en este momento</p> <button id="clear-filters-btn" onclick="window.__clearFilters()" class="hidden text-gold text-[8px] uppercase tracking-[0.3em] font-black border-b border-gold pb-1 hover:border-transparent transition-all" data-astro-cid-cuzcz5z4>Limpiar Búsqueda</button> </div> </div> </div> </section> </div> <!-- ═══════════════════════════════════════════════════════════
             FULL-PAGE CART
        ═══════════════════════════════════════════════════════════ --> <div id="cart-drawer" style="display:none; position:fixed; inset:0; z-index:3000; background:#F9F8F6;
                    overflow-y:auto; opacity:0; transition:opacity 0.4s ease;" data-astro-cid-cuzcz5z4> <!-- Top Bar --> <div style="background:#0a0a0a; padding:1.25rem 2.5rem; display:flex; justify-content:space-between;
                        align-items:center; position:sticky; top:0; z-index:10;
                        border-bottom:1px solid rgba(184,134,11,0.2);" data-astro-cid-cuzcz5z4> <div style="display:flex; align-items:center; gap:1rem;" data-astro-cid-cuzcz5z4> <!-- Logo matching nav style --> <div class="metal-gold-bg" style="height:48px; width:48px; flex-shrink:0;
                                -webkit-mask-image: url('/logo_circular.png'); -webkit-mask-size: contain;
                                -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;
                                mask-image: url('/logo_circular.png'); mask-size: contain;
                                mask-repeat: no-repeat; mask-position: center;" aria-label="Forever One Logo" data-astro-cid-cuzcz5z4></div> <div style="border-left:1px solid rgba(184,134,11,0.3); padding-left:1.25rem;" data-astro-cid-cuzcz5z4> <div style="font-family:'Playfair Display',serif; font-size:1.2rem; font-weight:900;
                                    font-style:italic; letter-spacing:0.05em;" class="metal-gold-text" data-astro-cid-cuzcz5z4>Forever One</div> <div style="font-size:7px; text-transform:uppercase; letter-spacing:0.5em;
                                    color:rgba(184,134,11,0.7); font-weight:700;" data-astro-cid-cuzcz5z4>Atelier Exclusivo</div> </div> </div> <button id="close-cart-btn" onclick="(function(){var d=document.getElementById('cart-drawer');if(!d)return;d.style.opacity='0';document.body.style.overflow='';setTimeout(function(){d.style.display='none';},400);})()" style="color:rgba(255,255,255,0.4); background:none; border:1px solid rgba(255,255,255,0.1);
                               width:40px; height:40px; display:flex; align-items:center; justify-content:center;
                               cursor:pointer; transition:all 0.3s;" onmouseenter="this.style.color='#fff'; this.style.borderColor='rgba(255,255,255,0.4)'" onmouseleave="this.style.color='rgba(255,255,255,0.4)'; this.style.borderColor='rgba(255,255,255,0.1)'" data-astro-cid-cuzcz5z4> <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-cuzcz5z4></path> </svg> </button> </div> <!-- Empty State --> <div id="cart-empty-msg" style="display:flex; flex-direction:column; align-items:center; justify-content:center;
                        min-height:70vh; gap:1.5rem; opacity:0.35; font-style:italic;" data-astro-cid-cuzcz5z4> <svg width="64" height="64" fill="none" stroke="#B8860B" viewBox="0 0 24 24" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-astro-cid-cuzcz5z4></path> </svg> <p style="font-size:10px; text-transform:uppercase; letter-spacing:0.5em; font-weight:900; color:#555;" data-astro-cid-cuzcz5z4>
Su selección está vacía
</p> <button onclick="window.__closeCart()" style="font-size:9px; text-transform:uppercase; letter-spacing:0.4em; font-weight:900;
                               color:#B8860B; background:none; border:none; cursor:pointer; text-decoration:underline;
                               text-underline-offset:4px;" data-astro-cid-cuzcz5z4>
Ver Catálogo
</button> </div> <!-- Two-Column Layout (shown when cart has items) --> <div id="checkout-form-container" style="display:none; max-width:1280px; margin:0 auto; padding:3rem 2rem;
                        display:none; gap:4rem; grid-template-columns:1fr 1.1fr;" class="cart-grid" data-astro-cid-cuzcz5z4> <!-- ── LEFT: Products ─────────────────────────────── --> <div data-astro-cid-cuzcz5z4> <div style="display:flex; align-items:center; gap:1rem; margin-bottom:2rem; padding-bottom:1rem;
                                border-bottom:2px solid #0a0a0a;" data-astro-cid-cuzcz5z4> <span style="font-family:'Playfair Display',serif; font-size:1.3rem; font-weight:900;
                                     font-style:italic; color:#0a0a0a;" data-astro-cid-cuzcz5z4>Productos Seleccionados</span> <span id="cart-count-label" style="font-size:9px; text-transform:uppercase; letter-spacing:0.4em;
                               font-weight:700; color:#B8860B; background:rgba(184,134,11,0.08);
                               padding:4px 12px; border:1px solid rgba(184,134,11,0.2);" data-astro-cid-cuzcz5z4>0 prendas</span> </div> <!-- Items injected here --> <div id="products-list" style="display:flex; flex-direction:column; gap:1.5rem;" data-astro-cid-cuzcz5z4></div> <!-- Totals --> <div style="margin-top:2.5rem; padding:2rem; background:#0a0a0a;" data-astro-cid-cuzcz5z4> <div style="display:flex; justify-content:space-between; align-items:flex-end;" data-astro-cid-cuzcz5z4> <div data-astro-cid-cuzcz5z4> <div style="font-size:8px; text-transform:uppercase; letter-spacing:0.4em;
                                            color:rgba(255,255,255,0.4); margin-bottom:0.5rem; font-weight:700;" data-astro-cid-cuzcz5z4>Total (USD)</div> <div id="cart-total-usd" style="font-family:'Playfair Display',serif; font-size:2.5rem;
                                     font-weight:900; font-style:italic; color:#fff; line-height:1;" data-astro-cid-cuzcz5z4>$0.00</div> </div> <div style="text-align:right; padding-left:2rem; border-left:1px solid rgba(184,134,11,0.2);" data-astro-cid-cuzcz5z4> <div style="font-size:8px; text-transform:uppercase; letter-spacing:0.4em;
                                            color:#B8860B; margin-bottom:0.5rem; font-weight:700;" data-astro-cid-cuzcz5z4>Equivalente en Bs.</div> <div id="cart-total-bs" style="font-family:'Playfair Display',serif; font-size:1.6rem;
                                     font-weight:900; font-style:italic; color:#f3cf7a; line-height:1;" data-astro-cid-cuzcz5z4>Bs. 0.00</div> <div style="font-size:8px; color:rgba(255,255,255,0.3); margin-top:4px; letter-spacing:0.05em;" data-astro-cid-cuzcz5z4>
Tasa BCV + 1%: Bs. `, ` </div> </div> </div> </div> </div> <!-- ── RIGHT: Checkout Form ────────────────────────── --> <div style="display:flex; flex-direction:column; gap:2.5rem;" data-astro-cid-cuzcz5z4> <!-- SECTION 1: Personal Data --> <div class="cart-section" data-astro-cid-cuzcz5z4> <div class="cart-section-title" data-astro-cid-cuzcz5z4> <span class="cart-section-num" data-astro-cid-cuzcz5z4>1</span>
Datos Personales
</div> <div style="display:flex; flex-direction:column; gap:0.875rem;" data-astro-cid-cuzcz5z4> <input type="text" id="cust-name" placeholder="Nombre completo (ej: Juan García Pérez)" class="cart-input" data-astro-cid-cuzcz5z4> <input type="text" id="cust-id" placeholder="Cédula de identidad (ej: V-12.345.678)" class="cart-input" data-astro-cid-cuzcz5z4> <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.875rem;" data-astro-cid-cuzcz5z4> <input type="tel" id="cust-phone" placeholder="Teléfono (ej: 0412-1234567)" class="cart-input" data-astro-cid-cuzcz5z4> <input type="email" id="cust-email" placeholder="Correo electrónico" class="cart-input" data-astro-cid-cuzcz5z4> </div> </div> </div> <!-- SECTION 2: Delivery Method --> <div class="cart-section" data-astro-cid-cuzcz5z4> <div class="cart-section-title" data-astro-cid-cuzcz5z4> <span class="cart-section-num" data-astro-cid-cuzcz5z4>2</span>
Método de Entrega
</div> <!-- Method Selector Cards --> <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.75rem; margin-bottom:1.5rem;" data-astro-cid-cuzcz5z4> <!-- Retiro --> <button onclick="window.__setDeliveryMethod('retiro')" id="btn-meth-retiro" class="meth-card active-meth" data-astro-cid-cuzcz5z4> <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-bottom:8px;" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-astro-cid-cuzcz5z4></path> </svg> <span data-astro-cid-cuzcz5z4>Retiro</span> <small data-astro-cid-cuzcz5z4>En tienda</small> </button> <!-- Envío Nacional --> <button onclick="window.__setDeliveryMethod('envio')" id="btn-meth-envio" class="meth-card" data-astro-cid-cuzcz5z4> <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-bottom:8px;" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-astro-cid-cuzcz5z4></path> </svg> <span data-astro-cid-cuzcz5z4>Envío</span> <small data-astro-cid-cuzcz5z4>Nacional</small> </button> <!-- Delivery Local --> <button onclick="window.__setDeliveryMethod('delivery')" id="btn-meth-delivery" class="meth-card hidden" data-astro-cid-cuzcz5z4> <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-bottom:8px;" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16H2m11 0l2.4 2.4A1 1 0 0016 19h1a1 1 0 001-1v-1h1a1 1 0 001-1v-3a1 1 0 00-.3-.7L17.3 10H13v6z" data-astro-cid-cuzcz5z4></path> </svg> <span data-astro-cid-cuzcz5z4>Delivery</span> <small data-astro-cid-cuzcz5z4>Zona local</small> </button> </div> <!-- Dynamic Fields --> <!-- Envío Nacional --> <div id="envio-fields" class="hidden" style="display:none; flex-direction:column; gap:0.875rem;" data-astro-cid-cuzcz5z4> <p class="cart-field-label" data-astro-cid-cuzcz5z4>Selecciona tu empresa de transporte</p> <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.75rem;" data-astro-cid-cuzcz5z4> <button onclick="window.__setCourier('Zoom')" id="btn-courier-zoom" class="cour-btn-card" data-astro-cid-cuzcz5z4> <span style="font-weight:900;" data-astro-cid-cuzcz5z4>Zoom</span> </button> <button onclick="window.__setCourier('Tealca')" id="btn-courier-tealca" class="cour-btn-card" data-astro-cid-cuzcz5z4> <span style="font-weight:900;" data-astro-cid-cuzcz5z4>Tealca</span> </button> <button onclick="window.__setCourier('MRW')" id="btn-courier-mrw" class="cour-btn-card" data-astro-cid-cuzcz5z4> <span style="font-weight:900;" data-astro-cid-cuzcz5z4>MRW</span> </button> </div> <input type="text" id="ship-agency-code" placeholder="Código o número de agencia (ej: 0452)" class="cart-input" data-astro-cid-cuzcz5z4> <textarea id="ship-address" rows="2" placeholder="Estado y ciudad destino (ej: Carabobo, Valencia centro)" class="cart-input" style="resize:none;" data-astro-cid-cuzcz5z4></textarea> </div> <!-- Delivery Local --> <div id="delivery-local-fields" class="hidden" style="display:none; flex-direction:column; gap:0.875rem;" data-astro-cid-cuzcz5z4> <p class="cart-field-label" data-astro-cid-cuzcz5z4>Selecciona tu zona de reparto</p> <select id="delivery-zone-select" class="cart-input" style="cursor:pointer; appearance:none; background-image:url(" data:image svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="%23B8860B" stroke-width="2" %3E%3Cpath d="M6 9l6 6 6-6" %3E%3C svg%3E"); background-repeat:no-repeat; background-position:calc(100% - 16px) center;" data-astro-cid-cuzcz5z4> <option value="" data-astro-cid-cuzcz5z4>— Selecciona tu zona —</option> </select> <textarea id="delivery-address" rows="2" placeholder="Dirección exacta de entrega (calle, edificio, referencia)" class="cart-input" style="resize:none;" data-astro-cid-cuzcz5z4></textarea> </div> <!-- Retiro Info --> <div id="retiro-fields" style="background:rgba(184,134,11,0.06); border:1px solid rgba(184,134,11,0.2);
                                    padding:1.25rem 1.5rem; border-radius:2px;" data-astro-cid-cuzcz5z4> <p style="font-size:10px; color:#B8860B; font-weight:700; text-transform:uppercase;
                                      letter-spacing:0.3em; margin-bottom:0.5rem;" data-astro-cid-cuzcz5z4>📍 Punto de Retiro</p> <p style="font-size:12px; color:#555; font-style:italic; line-height:1.6;" data-astro-cid-cuzcz5z4>
Una vez confirmada tu orden, te informaremos la dirección exacta para retirar tu pedido.
                                Disponible de lunes a sábado.
</p> </div> </div> <!-- SECTION 3: Payment --> <div class="cart-section" data-astro-cid-cuzcz5z4> <div class="cart-section-title" data-astro-cid-cuzcz5z4> <span class="cart-section-num" data-astro-cid-cuzcz5z4>3</span>
Forma de Pago
</div> <!-- Pago Móvil Card --> <div style="border:1px solid rgba(0,0,0,0.08); background:#fff; padding:1.5rem; margin-bottom:1rem;" data-astro-cid-cuzcz5z4> <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.25rem;" data-astro-cid-cuzcz5z4> <div style="width:8px; height:8px; border-radius:50%; background:#B8860B; animation:pulse 2s ease infinite;" data-astro-cid-cuzcz5z4></div> <span style="font-size:9px; text-transform:uppercase; letter-spacing:0.4em; font-weight:900; color:#0a0a0a;" data-astro-cid-cuzcz5z4>
Pago Móvil
</span> </div> <div style="display:grid; grid-template-columns:auto 1fr; gap:0.5rem 1.5rem;
                                        font-size:12px; font-style:italic; color:#555; margin-bottom:1.25rem;
                                        padding-bottom:1.25rem; border-bottom:1px solid #f0f0f0;" data-astro-cid-cuzcz5z4> <span style="color:#aaa; font-size:9px; font-style:normal; text-transform:uppercase; letter-spacing:0.2em; align-self:center;" data-astro-cid-cuzcz5z4>Banco</span> <strong style="font-style:normal; color:#111;" data-astro-cid-cuzcz5z4>Venezuela — 0102</strong> <span style="color:#aaa; font-size:9px; font-style:normal; text-transform:uppercase; letter-spacing:0.2em; align-self:center;" data-astro-cid-cuzcz5z4>Teléfono</span> <strong style="font-style:normal; color:#111;" data-astro-cid-cuzcz5z4>0412-0708031</strong> <span style="color:#aaa; font-size:9px; font-style:normal; text-transform:uppercase; letter-spacing:0.2em; align-self:center;" data-astro-cid-cuzcz5z4>Cédula</span> <strong style="font-style:normal; color:#111;" data-astro-cid-cuzcz5z4>V-32.189.355</strong> </div> <input type="text" id="pay-reference" placeholder="Número de referencia del pago (ej: 012345678901)" class="cart-input" style="border-color:rgba(184,134,11,0.3); background:#fffdf7;" data-astro-cid-cuzcz5z4> </div> <!-- PayPal (Coming Soon) --> <button disabled style="width:100%; padding:1rem; border:1.5px solid #0070ba; color:#0070ba;
                                       background:#fff; font-size:9px; font-weight:900; text-transform:uppercase;
                                       letter-spacing:0.3em; display:flex; align-items:center; justify-content:center;
                                       gap:0.75rem; opacity:0.45; cursor:not-allowed;" data-astro-cid-cuzcz5z4> <svg width="16" height="16" fill="#0070ba" viewBox="0 0 24 24" data-astro-cid-cuzcz5z4> <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944 3.729C5.056 3.003 5.603 2.5 6.241 2.5h8.482c1.669 0 2.9.412 3.658 1.225.684.733.916 1.745.69 3.008-.287 1.706-1.127 2.87-2.493 3.46-1.558.673-3.048.601-4.708.601H10.15l-.23 1.344-.115.717-.803 4.542c-.105.743-.654 1.291-1.353 1.291l-.573-.076z" data-astro-cid-cuzcz5z4></path> </svg>
PayPal — Próximamente disponible
</button> </div> <!-- FINALIZE BUTTON --> <button id="checkout-btn" style="width:100%; padding:1.5rem; color:#fff; font-weight:900; text-transform:uppercase;
                                   letter-spacing:0.4em; font-size:10px; border:none; cursor:not-allowed;
                                   opacity:0.4; transition:all 0.3s;
                                   background:linear-gradient(135deg,#8B6508 0%,#B8860B 25%,#f3cf7a 50%,#B8860B 75%,#8B6508 100%);
                                   background-size:200% auto; animation:shine 5s linear infinite;" data-astro-cid-cuzcz5z4>
✦ Finalizar por WhatsApp
</button> <p style="text-align:center; font-size:9px; text-transform:uppercase; letter-spacing:0.5em;
                              color:#aaa; font-weight:700; margin-top:-1rem;" data-astro-cid-cuzcz5z4>Forever One — Atelier Exclusivo</p> </div> </div> </div> <!-- Cart Styles -->  <!-- Dollar Rate Widget (Left) --> <div id="dollar-widget" style="position:fixed !important; left:24px !important; bottom:24px !important; z-index:1500 !important;" data-astro-cid-cuzcz5z4> <div style="background:#0a0a0a; border:1px solid rgba(184,134,11,0.5); color:#fff;
                        padding:10px 18px; box-shadow:0 8px 32px rgba(0,0,0,0.4);
                        display:flex; align-items:center; gap:12px; border-radius:4px;" data-astro-cid-cuzcz5z4> <div style="width:36px; height:36px; border-radius:50%; border:1px solid rgba(184,134,11,0.4);
                            display:flex; align-items:center; justify-content:center;
                            color:#B8860B; font-weight:900; font-size:14px; flex-shrink:0;" data-astro-cid-cuzcz5z4>$</div> <div data-astro-cid-cuzcz5z4> <span style="display:block; font-size:7px; text-transform:uppercase;
                                 letter-spacing:0.4em; color:#B8860B; font-weight:900; opacity:0.7;
                                 margin-bottom:2px;" data-astro-cid-cuzcz5z4>Tasa BCV + 1%</span> <span id="dollar-rate-display" style="font-size:15px; font-weight:900; font-style:italic; letter-spacing:0.05em;" data-astro-cid-cuzcz5z4>Bs. `, `</span> </div> </div> </div> <!-- Cart FAB (Bottom-Right) --> <button id="open-cart-fab" onclick="(function(){var d=document.getElementById('cart-drawer');if(!d)return;d.style.display='block';document.body.style.overflow='hidden';d.scrollTo(0,0);requestAnimationFrame(function(){d.style.opacity='1';});})()" style="position:fixed !important; bottom:24px !important; right:24px !important;
                       z-index:1500 !important; width:64px; height:64px; border-radius:50%;
                       display:flex; align-items:center; justify-content:center;
                       border:1px solid rgba(255,255,255,0.2);
                       background:linear-gradient(135deg,#8B6508 0%,#B8860B 25%,#f3cf7a 50%,#B8860B 75%,#8B6508 100%);
                       background-size:200% auto; animation:shine 5s linear infinite;
                       box-shadow:0 8px 32px rgba(184,134,11,0.4);
                       cursor:pointer; transition:transform 0.2s ease;" onmouseenter="this.style.transform='scale(1.1)'" onmouseleave="this.style.transform='scale(1)'" data-astro-cid-cuzcz5z4> <svg style="width:28px;height:28px;color:#fff;" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-astro-cid-cuzcz5z4></path> </svg> <span id="cart-count-badge" style="display:none; position:absolute; top:-6px; right:-6px;
                         background:#fff; color:#000; font-size:11px; font-weight:900;
                         width:24px; height:24px; border-radius:50%;
                         align-items:center; justify-content:center;
                         box-shadow:0 2px 8px rgba(0,0,0,0.2); border:2px solid rgba(0,0,0,0.05);" data-astro-cid-cuzcz5z4>0</span> </button> </main> <script>
    (function() {
        // ── Constants ─────────────────────────────────────────────────────────────
        const WHATSAPP_NUMBER = '584244557693';

        // ── State ──────────────────────────────────────────────────────────────────
        let products = JSON.parse(document.getElementById('shop-root')?.dataset.products || '[]');
        let cart = [];
        let dollarRate = parseFloat(document.getElementById('shop-root')?.dataset.dollarRate || '0');
        
        // Delivery Settings
        const deliveryEnabled = document.getElementById('shop-root')?.dataset.delEnabled === 'true';
        const deliveryZones = (document.getElementById('shop-root')?.dataset.delZones || '').split(',').map(z => z.trim()).filter(z => z);

        let selectedMethod = 'retiro'; // retiro, envio, delivery
        let selectedCourier = 'Zoom';
        let selectedZone = '';
        
        let activeCategory = document.getElementById('shop-root')?.dataset.urlCat || 'Todos';
        let activeSubcategory = document.getElementById('shop-root')?.dataset.urlSub || '';
        let searchQuery = '';

        // ── Analytics Loader ────────────────────────────────────────────────────────
        // Now handled by the modern script block below
        function initAnalytics() {}

        // ── Toast Logic ────────────────────────────────────────────────────────────
        function showToast(msg) {
            let t = document.getElementById('fo1-toast');
            if(!t) {
                t = document.createElement('div');
                t.id = 'fo1-toast';
                t.style = 'position:fixed; bottom:24px; left:50%; transform:translateX(-50%); z-index:5000; background:rgba(0,0,0,0.9); color:#f3cf7a; padding:12px 24px; font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:0.3em; box-shadow:0 8px 32px rgba(0,0,0,0.5); border:1px solid rgba(184,134,11,0.3); pointer-events:none; transition:all 0.5s ease; opacity:0;';
                document.body.appendChild(t);
            }
            t.textContent = msg;
            t.style.opacity = '1';
            t.style.bottom = '32px';
            setTimeout(() => {
                t.style.opacity = '0';
                t.style.bottom = '24px';
            }, 3000);
        }

        // ── Helpers ────────────────────────────────────────────────────────────────
        function getVal(obj, label) {
            if (!obj) return null;
            const key = Object.keys(obj).find(k => k.trim().toLowerCase() === label.toLowerCase());
            return key ? obj[key] : null;
        }

        // Robust numeric extractor
        function getNum(val) {
            if (typeof val === 'number') return val;
            const clean = String(val || '0').replace(',', '.').replace(/[^\\d.]/g, '');
            return parseFloat(clean) || 0;
        }

        function saveCart() {
            try { localStorage.setItem('fo1_cart', JSON.stringify(cart)); } catch(e) {}
        }

        function loadCart() {
            try {
                const raw = JSON.parse(localStorage.getItem('fo1_cart') || '[]');
                // Sanitize: ensure precio and qty are always numbers
                cart = raw.map(i => {
                    const price = parseFloat(String(i.precio || '0').replace(',', '.'));
                    return {
                        ...i,
                        precio: isNaN(price) ? 0 : price,
                        qty: parseInt(i.qty) || 1
                    };
                }).filter(i => i.nombre && i.id);
            } catch(e) { cart = []; }
        }

        function fmtPrice(n) {
            const num = parseFloat(String(n || '0').replace(',', '.'));
            return isNaN(num) ? '$0.00' : '$' + num.toFixed(2);
        }

        function cartTotal() {
            return cart.reduce((s, i) => {
                const p = getNum(i.precio);
                const q = parseInt(i.qty) || 1;
                return s + (p * q);
            }, 0);
        }

        // ── DOM Shortcuts ──────────────────────────────────────────────────────────
        function el(id) { return document.getElementById(id); }

        // ── Categories ─────────────────────────────────────────────────────────────
        function getCategories() {
            return ['ropa', 'accesorios'];
        }

        function renderCategories() {
            // Ya no es dinámico de esta forma, usamos botones estáticos
        }

        window.__setCategory = function(cat) {
            activeCategory = cat;
            activeSubcategory = ''; // Al cambiar categoría principal, reseteamos subcategoría
            
            document.querySelectorAll('.cat-btn').forEach(b => {
                const id = b.id;
                const isActive = (cat === 'Todos' && id === 'cat-btn-todos') || (id === 'cat-btn-' + cat);
                b.className = isActive
                    ? 'cat-btn active px-6 py-2 border-b-2 border-gold text-gold text-[9px] uppercase tracking-[0.6em] font-black transition-all duration-500'
                    : 'cat-btn px-6 py-2 border-b-2 border-transparent text-slate-400 hover:text-black text-[9px] uppercase tracking-[0.6em] font-black transition-all duration-500';
            });
            
            // Actualizar URL sin recargar
            const url = new URL(window.location.href);
            if (cat !== 'Todos') url.searchParams.set('cat', cat);
            else url.searchParams.delete('cat');
            url.searchParams.delete('sub');
            window.history.pushState({}, '', url);

            renderGrid();
        };

        window.__setSubcategory = function(slug) {
            activeSubcategory = slug;
            activeCategory = 'Todos'; // Si filtramos por subcat específica, ignoramos el filtro de categoría principal
            
            // Deseleccionar botones de categoría principal
            document.querySelectorAll('.cat-btn').forEach(b => {
                b.className = 'cat-btn px-6 py-2 border-b-2 border-transparent text-slate-400 hover:text-black text-[9px] uppercase tracking-[0.6em] font-black transition-all duration-500';
            });

            // Actualizar URL
            const url = new URL(window.location.href);
            url.searchParams.delete('cat');
            url.searchParams.set('sub', slug);
            window.history.pushState({}, '', url);

            renderGrid();
        };

        window.__setSearch = function(val) {
            searchQuery = val.toLowerCase().trim();
            renderGrid();
        };

        window.__clearFilters = function() {
            activeCategory = 'Todos';
            activeSubcategory = '';
            searchQuery = '';
            const searchInput = el('search-input');
            if (searchInput) searchInput.value = '';
            
            const url = new URL(window.location.href);
            url.searchParams.delete('cat');
            url.searchParams.delete('sub');
            window.history.pushState({}, '', url);

            window.__setCategory('Todos');
        };

        function renderGrid() {
            const grid = el('product-grid');
            const emptyState = el('empty-state');
            const emptyMsg = el('empty-state-msg');
            const clearBtn = el('clear-filters-btn');
            if (!grid) return;

            // Triple filtering: Category + Subcategory + Search
            const visible = products.filter(p => {
                const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
                const matchesSubcategory = !activeSubcategory || p.subcategory_slug === activeSubcategory;
                const matchesSearch = !searchQuery || 
                                     p.nombre.toLowerCase().includes(searchQuery) || 
                                     (p.descripcion && p.descripcion.toLowerCase().includes(searchQuery)) ||
                                     (p.subcategory_name && p.subcategory_name.toLowerCase().includes(searchQuery));
                
                return matchesCategory && matchesSubcategory && matchesSearch;
            });

            if (visible.length === 0) {
                grid.innerHTML = '';
                if (emptyState) {
                    emptyState.classList.remove('hidden');
                    if (searchQuery) {
                        emptyMsg.textContent = 'No se encontró ningún resultado para "' + searchQuery + '"';
                        clearBtn.classList.remove('hidden');
                    } else {
                        emptyMsg.textContent = 'No hay productos disponibles en esta categoría';
                        clearBtn.classList.add('hidden');
                    }
                }
                return;
            }
            
            if (emptyState) emptyState.classList.add('hidden');

            grid.innerHTML = visible.map(p => {
                const inStock = parseInt(p.stock) > 0;
                const hasRealCat = p.category && p.category.toLowerCase() !== 'general' && p.category.trim() !== '';

                // Price display
                const rawPrice = getNum(p.precio);
                const showPrice = rawPrice > 0;
                const priceDisplay = '$' + rawPrice.toFixed(2);
                const bsDisplay = showPrice && dollarRate > 0
                    ? \`<span style="font-size:10px; color:#aaa; font-weight:600; margin-left:8px;">≈ Bs. \${Math.round(rawPrice * dollarRate).toLocaleString()}</span>\`
                    : '';

                // Button
                const btnStyle = inStock
                    ? 'background:#111; color:#fff; cursor:pointer;'
                    : 'background:#e5e7eb; color:#9ca3af; cursor:not-allowed; pointer-events:none;';
                const btnLabel = inStock ? '+ Añadir al Carrito' : 'Sin Stock';
                const btnHoverIn  = inStock ? \`this.style.background='#B8860B';\` : '';
                const btnHoverOut = inStock ? \`this.style.background='#111';\` : '';

                return \`
                <article data-product-id="\${p.id}"
                         style="background:#fff; display:flex; flex-direction:column; overflow:hidden;
                                box-shadow:0 4px 24px rgba(0,0,0,0.07); transition:all 0.4s ease;"
                         onmouseenter="this.style.boxShadow='0 12px 48px rgba(0,0,0,0.14)'; this.style.transform='translateY(-4px)';"
                         onmouseleave="this.style.boxShadow='0 4px 24px rgba(0,0,0,0.07)'; this.style.transform='translateY(0)';">

                    <!-- IMAGE BLOCK -->
                    <div style="position:relative; aspect-ratio:3/4; overflow:hidden; background:#f0ede8; flex-shrink:0;">
                        <img src="\${p.imagen}" alt="\${p.nombre}" loading="lazy"
                             style="width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.9s ease;"
                             onmouseenter="this.style.transform='scale(1.07)'"
                             onmouseleave="this.style.transform='scale(1)'"
                             onerror="this.src='https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=400'">

                        <!-- Category Tag (top-left) -->
                        <div style="position:absolute; top:10px; left:10px; z-index:2;">
                            <span style="background:rgba(0,0,0,0.85); color:#f3cf7a;
                                         font-size:7px; font-weight:800; text-transform:uppercase;
                                         letter-spacing:0.4em; padding:5px 12px; display:block;
                                         backdrop-filter:blur(4px);">
                                \${p.categoria_label} \${p.coleccion ? '— ' + p.coleccion : ''}
                            </span>
                        </div>

                        <!-- Agotado badge -->
                        \${!inStock ? \`
                        <div style="position:absolute; top:10px; right:10px; z-index:2;">
                            <span style="background:rgba(220,38,38,0.9); color:#fff; font-size:8px; font-weight:700;
                                          text-transform:uppercase; letter-spacing:0.15em;
                                          padding:5px 10px; border-radius:999px; display:block;
                                          white-space:nowrap; backdrop-filter:blur(4px);">
                                Agotado
                            </span>
                        </div>\` : ''}
                    </div>

                    <!-- TEXT BLOCK -->
                    <div style="padding:20px 18px 4px; display:flex; flex-direction:column; gap:6px; flex:1;">
                        
                        <h3 style="margin:0; font-family:'Cinzel',serif; font-weight:900; font-style:italic;
                                   text-transform:uppercase; font-size:0.85rem; line-height:1.2; color:#111;
                                   letter-spacing:0.02em;">
                            \${p.nombre}
                        </h3>

                        <p style="margin:4px 0 0; font-size:10.5px; color:#666; font-style:italic;
                                  line-height:1.5; font-weight:400;
                                  display:-webkit-box; -webkit-line-clamp:3;
                                  -webkit-box-orient:vertical; overflow:hidden;">
                            \${p.descripcion || ''}
                        </p>

                        <div style="flex:1; min-height:12px;"></div>

                        <!-- PRICE ROW -->
                        \${showPrice ? \`
                        <div style="border-top:1px solid rgba(184,134,11,0.1); padding-top:12px;
                                    display:flex; align-items:baseline; flex-wrap:wrap; gap:4px;">
                            <span style="font-size:1.4rem; font-weight:900; font-style:italic;
                                         color:#B8860B; line-height:1;">
                                \${priceDisplay}
                            </span>
                            \${bsDisplay}
                        </div>\` : ''}
                    </div>

                    <!-- BUTTON -->
                    <div style="padding:12px 18px 18px;">
                        <button onclick="window.__addToCart('\${p.id}')"
                                \${!inStock ? 'disabled' : ''}
                                style="width:100%; padding:14px 8px; border:none; font-size:8.5px;
                                       font-family:'Montserrat',sans-serif; font-weight:900;
                                       text-transform:uppercase; letter-spacing:0.45em;
                                       transition:background 0.25s; \${btnStyle}"
                                onmouseenter="\${btnHoverIn}"
                                onmouseleave="\${btnHoverOut}">
                            \${btnLabel}
                        </button>
                    </div>
                </article>\`;
            }).join('');
        }

        // ── Cart Logic ─────────────────────────────────────────────────────────────
        window.__addToCart = function(productId) {
            const product = products.find(p => p.id === productId);
            if (!product || parseInt(product.stock) <= 0) return;
            
            const existing = cart.find(i => i.id === productId);
            if (existing) {
                if (existing.qty >= parseInt(product.stock)) { alert('Stock máximo alcanzado'); return; }
                existing.qty++;
            } else {
                cart.push({ ...product, qty: 1 });
            }
            saveCart();
            renderCart();
            
            // "Smooth" Animation effects
            showToast('✓ Añadido al atelier');
            
            const fab = el('open-cart-fab');
            if (fab) {
                fab.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                fab.style.transform = 'scale(1.3) rotate(8deg)';
                setTimeout(() => { fab.style.transform = 'scale(1) rotate(0deg)'; }, 400);
            }

            const badge = el('cart-count-badge');
            if (badge) {
                badge.style.display = 'flex';
                badge.style.animation = 'none';
                void badge.offsetWidth; // trigger reflow
                badge.style.animation = 'pulse 1s forwards';
            }
        };

        window.__removeFromCart = function(productId) {
            cart = cart.filter(i => i.id !== productId);
            saveCart();
            renderCart();
        };

        window.__updateQty = function(productId, delta) {
            const item = cart.find(i => i.id === productId);
            if (!item) return;
            const product = products.find(p => p.id === productId);
            const newQty = item.qty + delta;
            if (newQty <= 0) { window.__removeFromCart(productId); return; }
            if (product && newQty > parseInt(product.stock)) { alert('Stock máximo alcanzado'); return; }
            item.qty = newQty;
            saveCart();
            renderCart();
        };

        function renderCart() {
            const container = el('products-list');
            const formContainer = el('checkout-form-container');
            const emptyMsg = el('cart-empty-msg');
            const totalUSD = el('cart-total-usd');
            const badge = el('cart-count-badge');
            const countLabel = el('cart-count-label');
            
            if (!container) return;

            const total = cartTotal();
            const count = cart.reduce((s, i) => s + (parseInt(i.qty) || 1), 0);
            
            // Update badge on FAB
            if (badge) { badge.textContent = count; badge.style.display = count > 0 ? 'flex' : 'none'; }
            // Update count label inside full-page cart
            if (countLabel) countLabel.textContent = count + (count === 1 ? ' prenda' : ' prendas');
            if (totalUSD) totalUSD.textContent = fmtPrice(total);
            
            const totalBS = el('cart-total-bs');
            if (totalBS && dollarRate > 0) {
                totalBS.textContent = 'Bs. ' + (total * dollarRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }

            // Show/hide empty state vs checkout grid
            const hasItems = cart.length > 0;
            if (emptyMsg) emptyMsg.style.display = hasItems ? 'none' : 'flex';
            // Full-page cart uses grid layout
            if (formContainer) formContainer.style.display = hasItems ? 'grid' : 'none';
            
            const checkoutBtn = el('checkout-btn');
            if (checkoutBtn) {
                checkoutBtn.style.opacity = hasItems ? '1' : '0.4';
                checkoutBtn.style.pointerEvents = hasItems ? 'auto' : 'none';
                checkoutBtn.style.cursor = hasItems ? 'pointer' : 'not-allowed';
            }

            if (!hasItems) {
                container.innerHTML = '';
                return;
            }

            container.innerHTML = cart.map(item => \`
                <div style="display:flex; gap:20px; padding:1.25rem; background:#fff; border:1px solid rgba(0,0,0,0.07);">
                    <img src="\${item.imagen}" style="width:80px; height:100px; object-fit:cover; flex-shrink:0;">
                    <div style="flex:1; min-width:0;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                            <div>
                                <div style="font-size:9px; text-transform:uppercase; letter-spacing:0.3em; font-weight:900; color:#111; margin-bottom:4px;">\${item.nombre}</div>
                                \${item.size ? \`<div style="font-size:8px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:700; background:rgba(184,134,11,0.08); padding:2px 8px; display:inline-block;">\${item.size}</div>\` : ''}
                            </div>
                            <button onclick="window.__removeFromCart('\${item.id}')"
                                    style="color:#ccc; font-size:18px; line-height:1; background:none; border:none; cursor:pointer; flex-shrink:0;"
                                    onmouseenter="this.style.color='#ff4d4d'"
                                    onmouseleave="this.style.color='#ccc'">×</button>
                        </div>
                        <div style="display:flex; align-items:center; justify-content:space-between; margin-top:12px;">
                            <div style="display:flex; align-items:center; border:1px solid #eee;">
                                <button onclick="window.__updateQty('\${item.id}', -1)"
                                        style="width:32px; height:32px; display:flex; align-items:center; justify-content:center;
                                               font-weight:900; color:#555; background:#fafafa; border:none; cursor:pointer;
                                               font-size:16px;">−</button>
                                <span style="font-size:12px; font-weight:900; min-width:36px; text-align:center; color:#111;">\${item.qty}</span>
                                <button onclick="window.__updateQty('\${item.id}', 1)"
                                        style="width:32px; height:32px; display:flex; align-items:center; justify-content:center;
                                               font-weight:900; color:#555; background:#fafafa; border:none; cursor:pointer;
                                               font-size:16px;">+</button>
                            </div>
                            <div style="text-align:right;">
                                <div style="font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:900; font-style:italic; color:#0a0a0a;">\${fmtPrice(getNum(item.precio) * item.qty)}</div>
                                \${dollarRate > 0 ? \`<div style="font-size:9px; color:#B8860B; font-weight:700;">Bs. \${(getNum(item.precio) * item.qty * dollarRate).toLocaleString('es-VE',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>\` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            \`).join('');
        }

        // ── Delivery Methods ───────────────────────────────────────────────────────
        function updateDeliveryUI() {
            // Method cards (full-page design uses .meth-card)
            document.querySelectorAll('.meth-card').forEach(b => {
                b.classList.toggle('active-meth', b.id === 'btn-meth-' + selectedMethod);
            });

            // Show/hide delivery button based on admin setting
            const delBtn = el('btn-meth-delivery');
            if (delBtn) {
                delBtn.style.display = deliveryEnabled ? '' : 'none';
                delBtn.classList.toggle('hidden', !deliveryEnabled);
            }

            // Toggle dynamic field panels
            const envioF = el('envio-fields');
            const deliveryF = el('delivery-local-fields');
            const retiroF = el('retiro-fields');

            if (envioF) envioF.style.display = selectedMethod === 'envio' ? 'flex' : 'none';
            if (deliveryF) deliveryF.style.display = selectedMethod === 'delivery' ? 'flex' : 'none';
            if (retiroF) retiroF.style.display = selectedMethod === 'retiro' ? 'block' : 'none';

            // Courier cards
            document.querySelectorAll('.cour-btn-card').forEach(b => {
                b.classList.toggle('active-cour',
                    b.id === 'btn-courier-' + selectedCourier.toLowerCase());
            });

            // Populate zone dropdown (only once)
            const zoneSelect = el('delivery-zone-select');
            if (zoneSelect && zoneSelect.options.length <= 1 && deliveryZones.length > 0) {
                deliveryZones.forEach(z => {
                    const opt = document.createElement('option');
                    opt.value = z; opt.textContent = z;
                    zoneSelect.appendChild(opt);
                });
            }
        }

        window.__setDeliveryMethod = function(meth) {
            selectedMethod = meth;
            updateDeliveryUI();
        };

        window.__setCourier = function(cour) {
            selectedCourier = cour;
            updateDeliveryUI();
        };

        // ── Checkout ───────────────────────────────────────────────────────────────
        async function checkout() {
            if (cart.length === 0) return;
            
            const btn = el('checkout-btn');
            const custName = el('cust-name').value.trim();
            const custId = el('cust-id').value.trim();
            const custPhone = el('cust-phone').value.trim();
            const custEmail = el('cust-email').value.trim();
            const payRef = el('pay-reference').value.trim();

            if (!custName || !custId || !custPhone || !custEmail) {
                showToast('❌ LOS DATOS PERSONALES SON OBLIGATORIOS');
                return;
            }

            if (!payRef) {
                showToast('❌ SE REQUIERE EL NÚMERO DE REFERENCIA');
                return;
            }

            // Datos específicos de entrega
            let shippingDetails = '';
            if (selectedMethod === 'envio') {
                const code = el('ship-agency-code').value.trim();
                const addr = el('ship-address').value.trim();
                if (!code || !addr) { showToast('❌ COMPLETE DATOS DE AGENCIA'); return; }
                shippingDetails = \`🔹 *Envío Nacional:* \${selectedCourier}\\n🔹 *Agencia:* \${code}\\n🔹 *Ubicación:* \${addr}\`;
            } else if (selectedMethod === 'delivery') {
                const zone = el('delivery-zone-select').value;
                const addr = el('delivery-address').value.trim();
                if (!zone || !addr) { showToast('❌ SELECCIONE ZONA Y DIRECCIÓN'); return; }
                shippingDetails = \`🔹 *Delivery Local:* \${zone}\\n🔹 *Dirección:* \${addr}\`;
            } else {
                shippingDetails = \`🔹 *Modo:* Retiro en Agencia\`;
            }

            try {
                btn.disabled = true;
                btn.textContent = '⏱ PROCESANDO...';

                const total = cartTotal();

                // Track in analytics
                if (window.__analytics) {
                    cart.forEach(item => {
                        window.__analytics.trackWhatsAppClick(item.id);
                    });
                }

                // 1. Guardar en Base de Datos vía API
                const orderData = {
                    customer: {
                        name: custName,
                        email: custEmail,
                        phone: custPhone,
                        city: selectedMethod === 'delivery' ? el('delivery-zone-select').value : (selectedMethod === 'envio' ? el('ship-address').value : 'Tienda'),
                        paymentReference: payRef
                    },
                    items: cart.map(i => ({
                        productId: i.id,
                        variantId: i.variants?.[0]?.id || null, // Primera variante por defecto
                        name: i.nombre,
                        size: i.size || i.variants?.[0]?.size || 'UNICO',
                        price: getNum(i.precio),
                        qty: i.qty
                    })),
                    total: total,
                    courier: selectedMethod === 'envio' ? selectedCourier : 'otro'
                };

                const response = await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Error al procesar pedido en el sistema');
                }

                const { orderCode } = await response.json();
                const totalBs = (total * dollarRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                // WhatsApp Message Generation (Ultra-Structured)
                let msg = \`✦ *DISEÑO EXCLUSIVO - ATELIER FOREVER ONE* ✦\\n\`;
                msg += \`━━━━━━━━━━━━━━━━━━━━\\n\\n\`;
                msg += \`🆔 *ORDEN:* \${orderCode}\\n\\n\`;
                msg += \`👤 *CLIENTE*\\n\`;
                msg += \`▪️ *Nombre:* \${custName}\\n\`;
                msg += \`▪️ *Cédula:* \${custId}\\n\`;
                msg += \`▪️ *Tel:* \${custPhone}\\n\\n\`;
                
                msg += \`📦 *PRODUCTOS SELECCIONADOS*\\n\`;
                cart.forEach(i => {
                    msg += \`▪️ \${i.nombre} (x\${i.qty}) — \${fmtPrice(getNum(i.precio) * i.qty)}\\n\`;
                });
                msg += \`\\n\`;

                msg += \`🚚 *DETALLES DE ENTREGA*\\n\`;
                msg += \`\${shippingDetails}\\n\\n\`;

                msg += \`🏛 *RESUMEN DE PAGO*\\n\`;
                msg += \`💰 *Subtotal:* \${fmtPrice(total)}\\n\`;
                msg += \`💵 *Tasa BCV:* Bs. \${dollarRate.toFixed(2)} (+1%)\\n\`;
                msg += \`💸 *Total en Bolívares:* Bs. \${totalBs}\\n\`;
                msg += \`💳 *Referencia:* \${payRef}\\n\\n\`;
                
                msg += \`━━━━━━━━━━━━━━━━━━━━\\n\`;
                msg += \`_Solicitud enviada desde Atelier FO1_\`;
                
                window.open(\`https://wa.me/\${WHATSAPP_NUMBER}?text=\${encodeURIComponent(msg)}\`, '_blank');
                
                // Limpiar carrito tras éxito
                cart = []; saveCart(); renderCart();
                closeCart();

            } catch (e) {
                console.error(e);
                showToast('Error al procesar el pedido. Intente de nuevo.');
            } finally {
                btn.disabled = false;
                btn.textContent = 'FINALIZAR POR WHATSAPP';
            }
        }

        // ── Cart Open/Close (Full Page) ────────────────────────────────────────────
        function openCart() {
            const drawer = el('cart-drawer');
            if (!drawer) return;
            drawer.style.display = 'block';
            document.body.style.overflow = 'hidden';
            // Scroll to top of cart page
            drawer.scrollTo(0, 0);
            // Fade in
            requestAnimationFrame(() => {
                drawer.style.opacity = '1';
            });
        }
        function closeCart() {
            const drawer = el('cart-drawer');
            if (!drawer) return;
            drawer.style.opacity = '0';
            document.body.style.overflow = '';
            setTimeout(() => { drawer.style.display = 'none'; }, 400);
        }
        window.__closeCart = closeCart;

        // ── Data Fetch (legacy fallback - not used) ─────────────────────────────
        async function fetchProducts() {
            // Products now come from Supabase SSR via data-products attribute
            // This function is kept for reference only
        }

        // ── Event Listeners ────────────────────────────────────────────────────────
        function bindEvents() {
            const closeBtn = el('close-cart-btn');
            const openFab = el('open-cart-fab');
            const checkoutBtn = el('checkout-btn');

            if (closeBtn) closeBtn.onclick = closeCart;
            if (openFab) openFab.onclick = openCart;
            if (checkoutBtn) checkoutBtn.onclick = checkout;

            // Close on Escape key
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') closeCart();
            });
        }

        // ── Init ───────────────────────────────────────────────────────────────────
        function init() {
            loadCart();
            bindEvents();
            // Ya no usamos fetchProducts, los datos vienen de Supabase (SSR)
            el('loading-spinner').style.display = 'none';
            renderCategories();
            renderGrid();
            updateDeliveryUI();
            renderCart();
            initAnalytics();
        }

        // Run on DOMContentLoaded OR immediately if DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        // Also re-init on Astro View Transitions
        document.addEventListener('astro:after-swap', () => {
            if (document.getElementById('shop-root')) {
                init();
            }
        });
    })();
    </script> `, " "], [" ", " ", '<main id="ropas-page" class="relative" data-astro-cid-cuzcz5z4> ', ' <!-- Alpine.js wrapper — deferred until after script is defined --> <div id="shop-root"', "", "", "", "", "", ` data-astro-cid-cuzcz5z4> <section class="py-24 bg-[#FAF9F6]" data-astro-cid-cuzcz5z4> <div class="max-w-7xl mx-auto px-6" data-astro-cid-cuzcz5z4> <!-- Búsqueda Premium --> <div class="max-w-xl mx-auto mb-12" data-aos="fade-up" data-astro-cid-cuzcz5z4> <div class="relative group" data-astro-cid-cuzcz5z4> <input type="text" id="search-input" placeholder="Buscar su próxima prenda..." oninput="window.__setSearch(this.value)" class="w-full bg-white text-black border border-gold/20 py-5 pl-14 pr-6 text-xs uppercase tracking-[0.3em] font-black italic outline-none transition-all duration-500 focus:border-gold focus:shadow-[0_0_20px_rgba(184,134,11,0.1)] placeholder:text-slate-300" data-astro-cid-cuzcz5z4> <div class="absolute left-6 top-1/2 -translate-y-1/2 text-gold/40 group-focus-within:text-gold transition-colors duration-500" data-astro-cid-cuzcz5z4> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-astro-cid-cuzcz5z4></path> </svg> </div> </div> </div> <!-- Categorías --> <div class="flex flex-wrap justify-center gap-6 mb-20" data-astro-cid-cuzcz5z4> <button onclick="window.__setCategory('Todos')" id="cat-btn-todos" class="cat-btn active px-6 py-2 border-b-2 border-gold text-gold text-[9px] uppercase tracking-[0.6em] font-black transition-all duration-500" data-astro-cid-cuzcz5z4>
Todos
</button> <button onclick="window.__setCategory('ropa')" id="cat-btn-ropa" class="cat-btn px-6 py-2 border-b-2 border-transparent text-slate-400 hover:text-black text-[9px] uppercase tracking-[0.6em] font-black transition-all duration-500" data-astro-cid-cuzcz5z4>
Ropa
</button> <button onclick="window.__setCategory('accesorios')" id="cat-btn-accesorios" class="cat-btn px-6 py-2 border-b-2 border-transparent text-slate-400 hover:text-black text-[9px] uppercase tracking-[0.6em] font-black transition-all duration-500" data-astro-cid-cuzcz5z4>
Accesorios
</button> </div> <!-- Grid Editorial --> <div id="product-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16 min-h-[500px]" data-astro-cid-cuzcz5z4> <!-- JS will populate this --> </div> <div id="loading-spinner" class="flex justify-center py-20" data-astro-cid-cuzcz5z4> <div class="w-12 h-12 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" data-astro-cid-cuzcz5z4></div> </div> <div id="empty-state" class="hidden text-center py-32 opacity-80 italic" data-astro-cid-cuzcz5z4> <div class="max-w-xs mx-auto" data-astro-cid-cuzcz5z4> <svg class="w-12 h-12 mx-auto mb-6 text-gold/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-cuzcz5z4></path> </svg> <p id="empty-state-msg" class="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 mb-4" data-astro-cid-cuzcz5z4>No hay productos disponibles en este momento</p> <button id="clear-filters-btn" onclick="window.__clearFilters()" class="hidden text-gold text-[8px] uppercase tracking-[0.3em] font-black border-b border-gold pb-1 hover:border-transparent transition-all" data-astro-cid-cuzcz5z4>Limpiar Búsqueda</button> </div> </div> </div> </section> </div> <!-- ═══════════════════════════════════════════════════════════
             FULL-PAGE CART
        ═══════════════════════════════════════════════════════════ --> <div id="cart-drawer" style="display:none; position:fixed; inset:0; z-index:3000; background:#F9F8F6;
                    overflow-y:auto; opacity:0; transition:opacity 0.4s ease;" data-astro-cid-cuzcz5z4> <!-- Top Bar --> <div style="background:#0a0a0a; padding:1.25rem 2.5rem; display:flex; justify-content:space-between;
                        align-items:center; position:sticky; top:0; z-index:10;
                        border-bottom:1px solid rgba(184,134,11,0.2);" data-astro-cid-cuzcz5z4> <div style="display:flex; align-items:center; gap:1rem;" data-astro-cid-cuzcz5z4> <!-- Logo matching nav style --> <div class="metal-gold-bg" style="height:48px; width:48px; flex-shrink:0;
                                -webkit-mask-image: url('/logo_circular.png'); -webkit-mask-size: contain;
                                -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;
                                mask-image: url('/logo_circular.png'); mask-size: contain;
                                mask-repeat: no-repeat; mask-position: center;" aria-label="Forever One Logo" data-astro-cid-cuzcz5z4></div> <div style="border-left:1px solid rgba(184,134,11,0.3); padding-left:1.25rem;" data-astro-cid-cuzcz5z4> <div style="font-family:'Playfair Display',serif; font-size:1.2rem; font-weight:900;
                                    font-style:italic; letter-spacing:0.05em;" class="metal-gold-text" data-astro-cid-cuzcz5z4>Forever One</div> <div style="font-size:7px; text-transform:uppercase; letter-spacing:0.5em;
                                    color:rgba(184,134,11,0.7); font-weight:700;" data-astro-cid-cuzcz5z4>Atelier Exclusivo</div> </div> </div> <button id="close-cart-btn" onclick="(function(){var d=document.getElementById('cart-drawer');if(!d)return;d.style.opacity='0';document.body.style.overflow='';setTimeout(function(){d.style.display='none';},400);})()" style="color:rgba(255,255,255,0.4); background:none; border:1px solid rgba(255,255,255,0.1);
                               width:40px; height:40px; display:flex; align-items:center; justify-content:center;
                               cursor:pointer; transition:all 0.3s;" onmouseenter="this.style.color='#fff'; this.style.borderColor='rgba(255,255,255,0.4)'" onmouseleave="this.style.color='rgba(255,255,255,0.4)'; this.style.borderColor='rgba(255,255,255,0.1)'" data-astro-cid-cuzcz5z4> <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-cuzcz5z4></path> </svg> </button> </div> <!-- Empty State --> <div id="cart-empty-msg" style="display:flex; flex-direction:column; align-items:center; justify-content:center;
                        min-height:70vh; gap:1.5rem; opacity:0.35; font-style:italic;" data-astro-cid-cuzcz5z4> <svg width="64" height="64" fill="none" stroke="#B8860B" viewBox="0 0 24 24" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-astro-cid-cuzcz5z4></path> </svg> <p style="font-size:10px; text-transform:uppercase; letter-spacing:0.5em; font-weight:900; color:#555;" data-astro-cid-cuzcz5z4>
Su selección está vacía
</p> <button onclick="window.__closeCart()" style="font-size:9px; text-transform:uppercase; letter-spacing:0.4em; font-weight:900;
                               color:#B8860B; background:none; border:none; cursor:pointer; text-decoration:underline;
                               text-underline-offset:4px;" data-astro-cid-cuzcz5z4>
Ver Catálogo
</button> </div> <!-- Two-Column Layout (shown when cart has items) --> <div id="checkout-form-container" style="display:none; max-width:1280px; margin:0 auto; padding:3rem 2rem;
                        display:none; gap:4rem; grid-template-columns:1fr 1.1fr;" class="cart-grid" data-astro-cid-cuzcz5z4> <!-- ── LEFT: Products ─────────────────────────────── --> <div data-astro-cid-cuzcz5z4> <div style="display:flex; align-items:center; gap:1rem; margin-bottom:2rem; padding-bottom:1rem;
                                border-bottom:2px solid #0a0a0a;" data-astro-cid-cuzcz5z4> <span style="font-family:'Playfair Display',serif; font-size:1.3rem; font-weight:900;
                                     font-style:italic; color:#0a0a0a;" data-astro-cid-cuzcz5z4>Productos Seleccionados</span> <span id="cart-count-label" style="font-size:9px; text-transform:uppercase; letter-spacing:0.4em;
                               font-weight:700; color:#B8860B; background:rgba(184,134,11,0.08);
                               padding:4px 12px; border:1px solid rgba(184,134,11,0.2);" data-astro-cid-cuzcz5z4>0 prendas</span> </div> <!-- Items injected here --> <div id="products-list" style="display:flex; flex-direction:column; gap:1.5rem;" data-astro-cid-cuzcz5z4></div> <!-- Totals --> <div style="margin-top:2.5rem; padding:2rem; background:#0a0a0a;" data-astro-cid-cuzcz5z4> <div style="display:flex; justify-content:space-between; align-items:flex-end;" data-astro-cid-cuzcz5z4> <div data-astro-cid-cuzcz5z4> <div style="font-size:8px; text-transform:uppercase; letter-spacing:0.4em;
                                            color:rgba(255,255,255,0.4); margin-bottom:0.5rem; font-weight:700;" data-astro-cid-cuzcz5z4>Total (USD)</div> <div id="cart-total-usd" style="font-family:'Playfair Display',serif; font-size:2.5rem;
                                     font-weight:900; font-style:italic; color:#fff; line-height:1;" data-astro-cid-cuzcz5z4>$0.00</div> </div> <div style="text-align:right; padding-left:2rem; border-left:1px solid rgba(184,134,11,0.2);" data-astro-cid-cuzcz5z4> <div style="font-size:8px; text-transform:uppercase; letter-spacing:0.4em;
                                            color:#B8860B; margin-bottom:0.5rem; font-weight:700;" data-astro-cid-cuzcz5z4>Equivalente en Bs.</div> <div id="cart-total-bs" style="font-family:'Playfair Display',serif; font-size:1.6rem;
                                     font-weight:900; font-style:italic; color:#f3cf7a; line-height:1;" data-astro-cid-cuzcz5z4>Bs. 0.00</div> <div style="font-size:8px; color:rgba(255,255,255,0.3); margin-top:4px; letter-spacing:0.05em;" data-astro-cid-cuzcz5z4>
Tasa BCV + 1%: Bs. `, ` </div> </div> </div> </div> </div> <!-- ── RIGHT: Checkout Form ────────────────────────── --> <div style="display:flex; flex-direction:column; gap:2.5rem;" data-astro-cid-cuzcz5z4> <!-- SECTION 1: Personal Data --> <div class="cart-section" data-astro-cid-cuzcz5z4> <div class="cart-section-title" data-astro-cid-cuzcz5z4> <span class="cart-section-num" data-astro-cid-cuzcz5z4>1</span>
Datos Personales
</div> <div style="display:flex; flex-direction:column; gap:0.875rem;" data-astro-cid-cuzcz5z4> <input type="text" id="cust-name" placeholder="Nombre completo (ej: Juan García Pérez)" class="cart-input" data-astro-cid-cuzcz5z4> <input type="text" id="cust-id" placeholder="Cédula de identidad (ej: V-12.345.678)" class="cart-input" data-astro-cid-cuzcz5z4> <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.875rem;" data-astro-cid-cuzcz5z4> <input type="tel" id="cust-phone" placeholder="Teléfono (ej: 0412-1234567)" class="cart-input" data-astro-cid-cuzcz5z4> <input type="email" id="cust-email" placeholder="Correo electrónico" class="cart-input" data-astro-cid-cuzcz5z4> </div> </div> </div> <!-- SECTION 2: Delivery Method --> <div class="cart-section" data-astro-cid-cuzcz5z4> <div class="cart-section-title" data-astro-cid-cuzcz5z4> <span class="cart-section-num" data-astro-cid-cuzcz5z4>2</span>
Método de Entrega
</div> <!-- Method Selector Cards --> <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.75rem; margin-bottom:1.5rem;" data-astro-cid-cuzcz5z4> <!-- Retiro --> <button onclick="window.__setDeliveryMethod('retiro')" id="btn-meth-retiro" class="meth-card active-meth" data-astro-cid-cuzcz5z4> <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-bottom:8px;" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-astro-cid-cuzcz5z4></path> </svg> <span data-astro-cid-cuzcz5z4>Retiro</span> <small data-astro-cid-cuzcz5z4>En tienda</small> </button> <!-- Envío Nacional --> <button onclick="window.__setDeliveryMethod('envio')" id="btn-meth-envio" class="meth-card" data-astro-cid-cuzcz5z4> <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-bottom:8px;" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-astro-cid-cuzcz5z4></path> </svg> <span data-astro-cid-cuzcz5z4>Envío</span> <small data-astro-cid-cuzcz5z4>Nacional</small> </button> <!-- Delivery Local --> <button onclick="window.__setDeliveryMethod('delivery')" id="btn-meth-delivery" class="meth-card hidden" data-astro-cid-cuzcz5z4> <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-bottom:8px;" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16H2m11 0l2.4 2.4A1 1 0 0016 19h1a1 1 0 001-1v-1h1a1 1 0 001-1v-3a1 1 0 00-.3-.7L17.3 10H13v6z" data-astro-cid-cuzcz5z4></path> </svg> <span data-astro-cid-cuzcz5z4>Delivery</span> <small data-astro-cid-cuzcz5z4>Zona local</small> </button> </div> <!-- Dynamic Fields --> <!-- Envío Nacional --> <div id="envio-fields" class="hidden" style="display:none; flex-direction:column; gap:0.875rem;" data-astro-cid-cuzcz5z4> <p class="cart-field-label" data-astro-cid-cuzcz5z4>Selecciona tu empresa de transporte</p> <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.75rem;" data-astro-cid-cuzcz5z4> <button onclick="window.__setCourier('Zoom')" id="btn-courier-zoom" class="cour-btn-card" data-astro-cid-cuzcz5z4> <span style="font-weight:900;" data-astro-cid-cuzcz5z4>Zoom</span> </button> <button onclick="window.__setCourier('Tealca')" id="btn-courier-tealca" class="cour-btn-card" data-astro-cid-cuzcz5z4> <span style="font-weight:900;" data-astro-cid-cuzcz5z4>Tealca</span> </button> <button onclick="window.__setCourier('MRW')" id="btn-courier-mrw" class="cour-btn-card" data-astro-cid-cuzcz5z4> <span style="font-weight:900;" data-astro-cid-cuzcz5z4>MRW</span> </button> </div> <input type="text" id="ship-agency-code" placeholder="Código o número de agencia (ej: 0452)" class="cart-input" data-astro-cid-cuzcz5z4> <textarea id="ship-address" rows="2" placeholder="Estado y ciudad destino (ej: Carabobo, Valencia centro)" class="cart-input" style="resize:none;" data-astro-cid-cuzcz5z4></textarea> </div> <!-- Delivery Local --> <div id="delivery-local-fields" class="hidden" style="display:none; flex-direction:column; gap:0.875rem;" data-astro-cid-cuzcz5z4> <p class="cart-field-label" data-astro-cid-cuzcz5z4>Selecciona tu zona de reparto</p> <select id="delivery-zone-select" class="cart-input" style="cursor:pointer; appearance:none; background-image:url(\\" data:image svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="%23B8860B" stroke-width="2" %3E%3Cpath d="M6 9l6 6 6-6" %3E%3C svg%3E\\"); background-repeat:no-repeat; background-position:calc(100% - 16px) center;" data-astro-cid-cuzcz5z4> <option value="" data-astro-cid-cuzcz5z4>— Selecciona tu zona —</option> </select> <textarea id="delivery-address" rows="2" placeholder="Dirección exacta de entrega (calle, edificio, referencia)" class="cart-input" style="resize:none;" data-astro-cid-cuzcz5z4></textarea> </div> <!-- Retiro Info --> <div id="retiro-fields" style="background:rgba(184,134,11,0.06); border:1px solid rgba(184,134,11,0.2);
                                    padding:1.25rem 1.5rem; border-radius:2px;" data-astro-cid-cuzcz5z4> <p style="font-size:10px; color:#B8860B; font-weight:700; text-transform:uppercase;
                                      letter-spacing:0.3em; margin-bottom:0.5rem;" data-astro-cid-cuzcz5z4>📍 Punto de Retiro</p> <p style="font-size:12px; color:#555; font-style:italic; line-height:1.6;" data-astro-cid-cuzcz5z4>
Una vez confirmada tu orden, te informaremos la dirección exacta para retirar tu pedido.
                                Disponible de lunes a sábado.
</p> </div> </div> <!-- SECTION 3: Payment --> <div class="cart-section" data-astro-cid-cuzcz5z4> <div class="cart-section-title" data-astro-cid-cuzcz5z4> <span class="cart-section-num" data-astro-cid-cuzcz5z4>3</span>
Forma de Pago
</div> <!-- Pago Móvil Card --> <div style="border:1px solid rgba(0,0,0,0.08); background:#fff; padding:1.5rem; margin-bottom:1rem;" data-astro-cid-cuzcz5z4> <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.25rem;" data-astro-cid-cuzcz5z4> <div style="width:8px; height:8px; border-radius:50%; background:#B8860B; animation:pulse 2s ease infinite;" data-astro-cid-cuzcz5z4></div> <span style="font-size:9px; text-transform:uppercase; letter-spacing:0.4em; font-weight:900; color:#0a0a0a;" data-astro-cid-cuzcz5z4>
Pago Móvil
</span> </div> <div style="display:grid; grid-template-columns:auto 1fr; gap:0.5rem 1.5rem;
                                        font-size:12px; font-style:italic; color:#555; margin-bottom:1.25rem;
                                        padding-bottom:1.25rem; border-bottom:1px solid #f0f0f0;" data-astro-cid-cuzcz5z4> <span style="color:#aaa; font-size:9px; font-style:normal; text-transform:uppercase; letter-spacing:0.2em; align-self:center;" data-astro-cid-cuzcz5z4>Banco</span> <strong style="font-style:normal; color:#111;" data-astro-cid-cuzcz5z4>Venezuela — 0102</strong> <span style="color:#aaa; font-size:9px; font-style:normal; text-transform:uppercase; letter-spacing:0.2em; align-self:center;" data-astro-cid-cuzcz5z4>Teléfono</span> <strong style="font-style:normal; color:#111;" data-astro-cid-cuzcz5z4>0412-0708031</strong> <span style="color:#aaa; font-size:9px; font-style:normal; text-transform:uppercase; letter-spacing:0.2em; align-self:center;" data-astro-cid-cuzcz5z4>Cédula</span> <strong style="font-style:normal; color:#111;" data-astro-cid-cuzcz5z4>V-32.189.355</strong> </div> <input type="text" id="pay-reference" placeholder="Número de referencia del pago (ej: 012345678901)" class="cart-input" style="border-color:rgba(184,134,11,0.3); background:#fffdf7;" data-astro-cid-cuzcz5z4> </div> <!-- PayPal (Coming Soon) --> <button disabled style="width:100%; padding:1rem; border:1.5px solid #0070ba; color:#0070ba;
                                       background:#fff; font-size:9px; font-weight:900; text-transform:uppercase;
                                       letter-spacing:0.3em; display:flex; align-items:center; justify-content:center;
                                       gap:0.75rem; opacity:0.45; cursor:not-allowed;" data-astro-cid-cuzcz5z4> <svg width="16" height="16" fill="#0070ba" viewBox="0 0 24 24" data-astro-cid-cuzcz5z4> <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944 3.729C5.056 3.003 5.603 2.5 6.241 2.5h8.482c1.669 0 2.9.412 3.658 1.225.684.733.916 1.745.69 3.008-.287 1.706-1.127 2.87-2.493 3.46-1.558.673-3.048.601-4.708.601H10.15l-.23 1.344-.115.717-.803 4.542c-.105.743-.654 1.291-1.353 1.291l-.573-.076z" data-astro-cid-cuzcz5z4></path> </svg>
PayPal — Próximamente disponible
</button> </div> <!-- FINALIZE BUTTON --> <button id="checkout-btn" style="width:100%; padding:1.5rem; color:#fff; font-weight:900; text-transform:uppercase;
                                   letter-spacing:0.4em; font-size:10px; border:none; cursor:not-allowed;
                                   opacity:0.4; transition:all 0.3s;
                                   background:linear-gradient(135deg,#8B6508 0%,#B8860B 25%,#f3cf7a 50%,#B8860B 75%,#8B6508 100%);
                                   background-size:200% auto; animation:shine 5s linear infinite;" data-astro-cid-cuzcz5z4>
✦ Finalizar por WhatsApp
</button> <p style="text-align:center; font-size:9px; text-transform:uppercase; letter-spacing:0.5em;
                              color:#aaa; font-weight:700; margin-top:-1rem;" data-astro-cid-cuzcz5z4>Forever One — Atelier Exclusivo</p> </div> </div> </div> <!-- Cart Styles -->  <!-- Dollar Rate Widget (Left) --> <div id="dollar-widget" style="position:fixed !important; left:24px !important; bottom:24px !important; z-index:1500 !important;" data-astro-cid-cuzcz5z4> <div style="background:#0a0a0a; border:1px solid rgba(184,134,11,0.5); color:#fff;
                        padding:10px 18px; box-shadow:0 8px 32px rgba(0,0,0,0.4);
                        display:flex; align-items:center; gap:12px; border-radius:4px;" data-astro-cid-cuzcz5z4> <div style="width:36px; height:36px; border-radius:50%; border:1px solid rgba(184,134,11,0.4);
                            display:flex; align-items:center; justify-content:center;
                            color:#B8860B; font-weight:900; font-size:14px; flex-shrink:0;" data-astro-cid-cuzcz5z4>$</div> <div data-astro-cid-cuzcz5z4> <span style="display:block; font-size:7px; text-transform:uppercase;
                                 letter-spacing:0.4em; color:#B8860B; font-weight:900; opacity:0.7;
                                 margin-bottom:2px;" data-astro-cid-cuzcz5z4>Tasa BCV + 1%</span> <span id="dollar-rate-display" style="font-size:15px; font-weight:900; font-style:italic; letter-spacing:0.05em;" data-astro-cid-cuzcz5z4>Bs. `, `</span> </div> </div> </div> <!-- Cart FAB (Bottom-Right) --> <button id="open-cart-fab" onclick="(function(){var d=document.getElementById('cart-drawer');if(!d)return;d.style.display='block';document.body.style.overflow='hidden';d.scrollTo(0,0);requestAnimationFrame(function(){d.style.opacity='1';});})()" style="position:fixed !important; bottom:24px !important; right:24px !important;
                       z-index:1500 !important; width:64px; height:64px; border-radius:50%;
                       display:flex; align-items:center; justify-content:center;
                       border:1px solid rgba(255,255,255,0.2);
                       background:linear-gradient(135deg,#8B6508 0%,#B8860B 25%,#f3cf7a 50%,#B8860B 75%,#8B6508 100%);
                       background-size:200% auto; animation:shine 5s linear infinite;
                       box-shadow:0 8px 32px rgba(184,134,11,0.4);
                       cursor:pointer; transition:transform 0.2s ease;" onmouseenter="this.style.transform='scale(1.1)'" onmouseleave="this.style.transform='scale(1)'" data-astro-cid-cuzcz5z4> <svg style="width:28px;height:28px;color:#fff;" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-cuzcz5z4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-astro-cid-cuzcz5z4></path> </svg> <span id="cart-count-badge" style="display:none; position:absolute; top:-6px; right:-6px;
                         background:#fff; color:#000; font-size:11px; font-weight:900;
                         width:24px; height:24px; border-radius:50%;
                         align-items:center; justify-content:center;
                         box-shadow:0 2px 8px rgba(0,0,0,0.2); border:2px solid rgba(0,0,0,0.05);" data-astro-cid-cuzcz5z4>0</span> </button> </main> <script>
    (function() {
        // ── Constants ─────────────────────────────────────────────────────────────
        const WHATSAPP_NUMBER = '584244557693';

        // ── State ──────────────────────────────────────────────────────────────────
        let products = JSON.parse(document.getElementById('shop-root')?.dataset.products || '[]');
        let cart = [];
        let dollarRate = parseFloat(document.getElementById('shop-root')?.dataset.dollarRate || '0');
        
        // Delivery Settings
        const deliveryEnabled = document.getElementById('shop-root')?.dataset.delEnabled === 'true';
        const deliveryZones = (document.getElementById('shop-root')?.dataset.delZones || '').split(',').map(z => z.trim()).filter(z => z);

        let selectedMethod = 'retiro'; // retiro, envio, delivery
        let selectedCourier = 'Zoom';
        let selectedZone = '';
        
        let activeCategory = document.getElementById('shop-root')?.dataset.urlCat || 'Todos';
        let activeSubcategory = document.getElementById('shop-root')?.dataset.urlSub || '';
        let searchQuery = '';

        // ── Analytics Loader ────────────────────────────────────────────────────────
        // Now handled by the modern script block below
        function initAnalytics() {}

        // ── Toast Logic ────────────────────────────────────────────────────────────
        function showToast(msg) {
            let t = document.getElementById('fo1-toast');
            if(!t) {
                t = document.createElement('div');
                t.id = 'fo1-toast';
                t.style = 'position:fixed; bottom:24px; left:50%; transform:translateX(-50%); z-index:5000; background:rgba(0,0,0,0.9); color:#f3cf7a; padding:12px 24px; font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:0.3em; box-shadow:0 8px 32px rgba(0,0,0,0.5); border:1px solid rgba(184,134,11,0.3); pointer-events:none; transition:all 0.5s ease; opacity:0;';
                document.body.appendChild(t);
            }
            t.textContent = msg;
            t.style.opacity = '1';
            t.style.bottom = '32px';
            setTimeout(() => {
                t.style.opacity = '0';
                t.style.bottom = '24px';
            }, 3000);
        }

        // ── Helpers ────────────────────────────────────────────────────────────────
        function getVal(obj, label) {
            if (!obj) return null;
            const key = Object.keys(obj).find(k => k.trim().toLowerCase() === label.toLowerCase());
            return key ? obj[key] : null;
        }

        // Robust numeric extractor
        function getNum(val) {
            if (typeof val === 'number') return val;
            const clean = String(val || '0').replace(',', '.').replace(/[^\\\\d.]/g, '');
            return parseFloat(clean) || 0;
        }

        function saveCart() {
            try { localStorage.setItem('fo1_cart', JSON.stringify(cart)); } catch(e) {}
        }

        function loadCart() {
            try {
                const raw = JSON.parse(localStorage.getItem('fo1_cart') || '[]');
                // Sanitize: ensure precio and qty are always numbers
                cart = raw.map(i => {
                    const price = parseFloat(String(i.precio || '0').replace(',', '.'));
                    return {
                        ...i,
                        precio: isNaN(price) ? 0 : price,
                        qty: parseInt(i.qty) || 1
                    };
                }).filter(i => i.nombre && i.id);
            } catch(e) { cart = []; }
        }

        function fmtPrice(n) {
            const num = parseFloat(String(n || '0').replace(',', '.'));
            return isNaN(num) ? '$0.00' : '$' + num.toFixed(2);
        }

        function cartTotal() {
            return cart.reduce((s, i) => {
                const p = getNum(i.precio);
                const q = parseInt(i.qty) || 1;
                return s + (p * q);
            }, 0);
        }

        // ── DOM Shortcuts ──────────────────────────────────────────────────────────
        function el(id) { return document.getElementById(id); }

        // ── Categories ─────────────────────────────────────────────────────────────
        function getCategories() {
            return ['ropa', 'accesorios'];
        }

        function renderCategories() {
            // Ya no es dinámico de esta forma, usamos botones estáticos
        }

        window.__setCategory = function(cat) {
            activeCategory = cat;
            activeSubcategory = ''; // Al cambiar categoría principal, reseteamos subcategoría
            
            document.querySelectorAll('.cat-btn').forEach(b => {
                const id = b.id;
                const isActive = (cat === 'Todos' && id === 'cat-btn-todos') || (id === 'cat-btn-' + cat);
                b.className = isActive
                    ? 'cat-btn active px-6 py-2 border-b-2 border-gold text-gold text-[9px] uppercase tracking-[0.6em] font-black transition-all duration-500'
                    : 'cat-btn px-6 py-2 border-b-2 border-transparent text-slate-400 hover:text-black text-[9px] uppercase tracking-[0.6em] font-black transition-all duration-500';
            });
            
            // Actualizar URL sin recargar
            const url = new URL(window.location.href);
            if (cat !== 'Todos') url.searchParams.set('cat', cat);
            else url.searchParams.delete('cat');
            url.searchParams.delete('sub');
            window.history.pushState({}, '', url);

            renderGrid();
        };

        window.__setSubcategory = function(slug) {
            activeSubcategory = slug;
            activeCategory = 'Todos'; // Si filtramos por subcat específica, ignoramos el filtro de categoría principal
            
            // Deseleccionar botones de categoría principal
            document.querySelectorAll('.cat-btn').forEach(b => {
                b.className = 'cat-btn px-6 py-2 border-b-2 border-transparent text-slate-400 hover:text-black text-[9px] uppercase tracking-[0.6em] font-black transition-all duration-500';
            });

            // Actualizar URL
            const url = new URL(window.location.href);
            url.searchParams.delete('cat');
            url.searchParams.set('sub', slug);
            window.history.pushState({}, '', url);

            renderGrid();
        };

        window.__setSearch = function(val) {
            searchQuery = val.toLowerCase().trim();
            renderGrid();
        };

        window.__clearFilters = function() {
            activeCategory = 'Todos';
            activeSubcategory = '';
            searchQuery = '';
            const searchInput = el('search-input');
            if (searchInput) searchInput.value = '';
            
            const url = new URL(window.location.href);
            url.searchParams.delete('cat');
            url.searchParams.delete('sub');
            window.history.pushState({}, '', url);

            window.__setCategory('Todos');
        };

        function renderGrid() {
            const grid = el('product-grid');
            const emptyState = el('empty-state');
            const emptyMsg = el('empty-state-msg');
            const clearBtn = el('clear-filters-btn');
            if (!grid) return;

            // Triple filtering: Category + Subcategory + Search
            const visible = products.filter(p => {
                const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
                const matchesSubcategory = !activeSubcategory || p.subcategory_slug === activeSubcategory;
                const matchesSearch = !searchQuery || 
                                     p.nombre.toLowerCase().includes(searchQuery) || 
                                     (p.descripcion && p.descripcion.toLowerCase().includes(searchQuery)) ||
                                     (p.subcategory_name && p.subcategory_name.toLowerCase().includes(searchQuery));
                
                return matchesCategory && matchesSubcategory && matchesSearch;
            });

            if (visible.length === 0) {
                grid.innerHTML = '';
                if (emptyState) {
                    emptyState.classList.remove('hidden');
                    if (searchQuery) {
                        emptyMsg.textContent = 'No se encontró ningún resultado para "' + searchQuery + '"';
                        clearBtn.classList.remove('hidden');
                    } else {
                        emptyMsg.textContent = 'No hay productos disponibles en esta categoría';
                        clearBtn.classList.add('hidden');
                    }
                }
                return;
            }
            
            if (emptyState) emptyState.classList.add('hidden');

            grid.innerHTML = visible.map(p => {
                const inStock = parseInt(p.stock) > 0;
                const hasRealCat = p.category && p.category.toLowerCase() !== 'general' && p.category.trim() !== '';

                // Price display
                const rawPrice = getNum(p.precio);
                const showPrice = rawPrice > 0;
                const priceDisplay = '$' + rawPrice.toFixed(2);
                const bsDisplay = showPrice && dollarRate > 0
                    ? \\\`<span style="font-size:10px; color:#aaa; font-weight:600; margin-left:8px;">≈ Bs. \\\${Math.round(rawPrice * dollarRate).toLocaleString()}</span>\\\`
                    : '';

                // Button
                const btnStyle = inStock
                    ? 'background:#111; color:#fff; cursor:pointer;'
                    : 'background:#e5e7eb; color:#9ca3af; cursor:not-allowed; pointer-events:none;';
                const btnLabel = inStock ? '+ Añadir al Carrito' : 'Sin Stock';
                const btnHoverIn  = inStock ? \\\`this.style.background='#B8860B';\\\` : '';
                const btnHoverOut = inStock ? \\\`this.style.background='#111';\\\` : '';

                return \\\`
                <article data-product-id="\\\${p.id}"
                         style="background:#fff; display:flex; flex-direction:column; overflow:hidden;
                                box-shadow:0 4px 24px rgba(0,0,0,0.07); transition:all 0.4s ease;"
                         onmouseenter="this.style.boxShadow='0 12px 48px rgba(0,0,0,0.14)'; this.style.transform='translateY(-4px)';"
                         onmouseleave="this.style.boxShadow='0 4px 24px rgba(0,0,0,0.07)'; this.style.transform='translateY(0)';">

                    <!-- IMAGE BLOCK -->
                    <div style="position:relative; aspect-ratio:3/4; overflow:hidden; background:#f0ede8; flex-shrink:0;">
                        <img src="\\\${p.imagen}" alt="\\\${p.nombre}" loading="lazy"
                             style="width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.9s ease;"
                             onmouseenter="this.style.transform='scale(1.07)'"
                             onmouseleave="this.style.transform='scale(1)'"
                             onerror="this.src='https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=400'">

                        <!-- Category Tag (top-left) -->
                        <div style="position:absolute; top:10px; left:10px; z-index:2;">
                            <span style="background:rgba(0,0,0,0.85); color:#f3cf7a;
                                         font-size:7px; font-weight:800; text-transform:uppercase;
                                         letter-spacing:0.4em; padding:5px 12px; display:block;
                                         backdrop-filter:blur(4px);">
                                \\\${p.categoria_label} \\\${p.coleccion ? '— ' + p.coleccion : ''}
                            </span>
                        </div>

                        <!-- Agotado badge -->
                        \\\${!inStock ? \\\`
                        <div style="position:absolute; top:10px; right:10px; z-index:2;">
                            <span style="background:rgba(220,38,38,0.9); color:#fff; font-size:8px; font-weight:700;
                                          text-transform:uppercase; letter-spacing:0.15em;
                                          padding:5px 10px; border-radius:999px; display:block;
                                          white-space:nowrap; backdrop-filter:blur(4px);">
                                Agotado
                            </span>
                        </div>\\\` : ''}
                    </div>

                    <!-- TEXT BLOCK -->
                    <div style="padding:20px 18px 4px; display:flex; flex-direction:column; gap:6px; flex:1;">
                        
                        <h3 style="margin:0; font-family:'Cinzel',serif; font-weight:900; font-style:italic;
                                   text-transform:uppercase; font-size:0.85rem; line-height:1.2; color:#111;
                                   letter-spacing:0.02em;">
                            \\\${p.nombre}
                        </h3>

                        <p style="margin:4px 0 0; font-size:10.5px; color:#666; font-style:italic;
                                  line-height:1.5; font-weight:400;
                                  display:-webkit-box; -webkit-line-clamp:3;
                                  -webkit-box-orient:vertical; overflow:hidden;">
                            \\\${p.descripcion || ''}
                        </p>

                        <div style="flex:1; min-height:12px;"></div>

                        <!-- PRICE ROW -->
                        \\\${showPrice ? \\\`
                        <div style="border-top:1px solid rgba(184,134,11,0.1); padding-top:12px;
                                    display:flex; align-items:baseline; flex-wrap:wrap; gap:4px;">
                            <span style="font-size:1.4rem; font-weight:900; font-style:italic;
                                         color:#B8860B; line-height:1;">
                                \\\${priceDisplay}
                            </span>
                            \\\${bsDisplay}
                        </div>\\\` : ''}
                    </div>

                    <!-- BUTTON -->
                    <div style="padding:12px 18px 18px;">
                        <button onclick="window.__addToCart('\\\${p.id}')"
                                \\\${!inStock ? 'disabled' : ''}
                                style="width:100%; padding:14px 8px; border:none; font-size:8.5px;
                                       font-family:'Montserrat',sans-serif; font-weight:900;
                                       text-transform:uppercase; letter-spacing:0.45em;
                                       transition:background 0.25s; \\\${btnStyle}"
                                onmouseenter="\\\${btnHoverIn}"
                                onmouseleave="\\\${btnHoverOut}">
                            \\\${btnLabel}
                        </button>
                    </div>
                </article>\\\`;
            }).join('');
        }

        // ── Cart Logic ─────────────────────────────────────────────────────────────
        window.__addToCart = function(productId) {
            const product = products.find(p => p.id === productId);
            if (!product || parseInt(product.stock) <= 0) return;
            
            const existing = cart.find(i => i.id === productId);
            if (existing) {
                if (existing.qty >= parseInt(product.stock)) { alert('Stock máximo alcanzado'); return; }
                existing.qty++;
            } else {
                cart.push({ ...product, qty: 1 });
            }
            saveCart();
            renderCart();
            
            // "Smooth" Animation effects
            showToast('✓ Añadido al atelier');
            
            const fab = el('open-cart-fab');
            if (fab) {
                fab.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                fab.style.transform = 'scale(1.3) rotate(8deg)';
                setTimeout(() => { fab.style.transform = 'scale(1) rotate(0deg)'; }, 400);
            }

            const badge = el('cart-count-badge');
            if (badge) {
                badge.style.display = 'flex';
                badge.style.animation = 'none';
                void badge.offsetWidth; // trigger reflow
                badge.style.animation = 'pulse 1s forwards';
            }
        };

        window.__removeFromCart = function(productId) {
            cart = cart.filter(i => i.id !== productId);
            saveCart();
            renderCart();
        };

        window.__updateQty = function(productId, delta) {
            const item = cart.find(i => i.id === productId);
            if (!item) return;
            const product = products.find(p => p.id === productId);
            const newQty = item.qty + delta;
            if (newQty <= 0) { window.__removeFromCart(productId); return; }
            if (product && newQty > parseInt(product.stock)) { alert('Stock máximo alcanzado'); return; }
            item.qty = newQty;
            saveCart();
            renderCart();
        };

        function renderCart() {
            const container = el('products-list');
            const formContainer = el('checkout-form-container');
            const emptyMsg = el('cart-empty-msg');
            const totalUSD = el('cart-total-usd');
            const badge = el('cart-count-badge');
            const countLabel = el('cart-count-label');
            
            if (!container) return;

            const total = cartTotal();
            const count = cart.reduce((s, i) => s + (parseInt(i.qty) || 1), 0);
            
            // Update badge on FAB
            if (badge) { badge.textContent = count; badge.style.display = count > 0 ? 'flex' : 'none'; }
            // Update count label inside full-page cart
            if (countLabel) countLabel.textContent = count + (count === 1 ? ' prenda' : ' prendas');
            if (totalUSD) totalUSD.textContent = fmtPrice(total);
            
            const totalBS = el('cart-total-bs');
            if (totalBS && dollarRate > 0) {
                totalBS.textContent = 'Bs. ' + (total * dollarRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }

            // Show/hide empty state vs checkout grid
            const hasItems = cart.length > 0;
            if (emptyMsg) emptyMsg.style.display = hasItems ? 'none' : 'flex';
            // Full-page cart uses grid layout
            if (formContainer) formContainer.style.display = hasItems ? 'grid' : 'none';
            
            const checkoutBtn = el('checkout-btn');
            if (checkoutBtn) {
                checkoutBtn.style.opacity = hasItems ? '1' : '0.4';
                checkoutBtn.style.pointerEvents = hasItems ? 'auto' : 'none';
                checkoutBtn.style.cursor = hasItems ? 'pointer' : 'not-allowed';
            }

            if (!hasItems) {
                container.innerHTML = '';
                return;
            }

            container.innerHTML = cart.map(item => \\\`
                <div style="display:flex; gap:20px; padding:1.25rem; background:#fff; border:1px solid rgba(0,0,0,0.07);">
                    <img src="\\\${item.imagen}" style="width:80px; height:100px; object-fit:cover; flex-shrink:0;">
                    <div style="flex:1; min-width:0;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                            <div>
                                <div style="font-size:9px; text-transform:uppercase; letter-spacing:0.3em; font-weight:900; color:#111; margin-bottom:4px;">\\\${item.nombre}</div>
                                \\\${item.size ? \\\`<div style="font-size:8px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:700; background:rgba(184,134,11,0.08); padding:2px 8px; display:inline-block;">\\\${item.size}</div>\\\` : ''}
                            </div>
                            <button onclick="window.__removeFromCart('\\\${item.id}')"
                                    style="color:#ccc; font-size:18px; line-height:1; background:none; border:none; cursor:pointer; flex-shrink:0;"
                                    onmouseenter="this.style.color='#ff4d4d'"
                                    onmouseleave="this.style.color='#ccc'">×</button>
                        </div>
                        <div style="display:flex; align-items:center; justify-content:space-between; margin-top:12px;">
                            <div style="display:flex; align-items:center; border:1px solid #eee;">
                                <button onclick="window.__updateQty('\\\${item.id}', -1)"
                                        style="width:32px; height:32px; display:flex; align-items:center; justify-content:center;
                                               font-weight:900; color:#555; background:#fafafa; border:none; cursor:pointer;
                                               font-size:16px;">−</button>
                                <span style="font-size:12px; font-weight:900; min-width:36px; text-align:center; color:#111;">\\\${item.qty}</span>
                                <button onclick="window.__updateQty('\\\${item.id}', 1)"
                                        style="width:32px; height:32px; display:flex; align-items:center; justify-content:center;
                                               font-weight:900; color:#555; background:#fafafa; border:none; cursor:pointer;
                                               font-size:16px;">+</button>
                            </div>
                            <div style="text-align:right;">
                                <div style="font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:900; font-style:italic; color:#0a0a0a;">\\\${fmtPrice(getNum(item.precio) * item.qty)}</div>
                                \\\${dollarRate > 0 ? \\\`<div style="font-size:9px; color:#B8860B; font-weight:700;">Bs. \\\${(getNum(item.precio) * item.qty * dollarRate).toLocaleString('es-VE',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>\\\` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            \\\`).join('');
        }

        // ── Delivery Methods ───────────────────────────────────────────────────────
        function updateDeliveryUI() {
            // Method cards (full-page design uses .meth-card)
            document.querySelectorAll('.meth-card').forEach(b => {
                b.classList.toggle('active-meth', b.id === 'btn-meth-' + selectedMethod);
            });

            // Show/hide delivery button based on admin setting
            const delBtn = el('btn-meth-delivery');
            if (delBtn) {
                delBtn.style.display = deliveryEnabled ? '' : 'none';
                delBtn.classList.toggle('hidden', !deliveryEnabled);
            }

            // Toggle dynamic field panels
            const envioF = el('envio-fields');
            const deliveryF = el('delivery-local-fields');
            const retiroF = el('retiro-fields');

            if (envioF) envioF.style.display = selectedMethod === 'envio' ? 'flex' : 'none';
            if (deliveryF) deliveryF.style.display = selectedMethod === 'delivery' ? 'flex' : 'none';
            if (retiroF) retiroF.style.display = selectedMethod === 'retiro' ? 'block' : 'none';

            // Courier cards
            document.querySelectorAll('.cour-btn-card').forEach(b => {
                b.classList.toggle('active-cour',
                    b.id === 'btn-courier-' + selectedCourier.toLowerCase());
            });

            // Populate zone dropdown (only once)
            const zoneSelect = el('delivery-zone-select');
            if (zoneSelect && zoneSelect.options.length <= 1 && deliveryZones.length > 0) {
                deliveryZones.forEach(z => {
                    const opt = document.createElement('option');
                    opt.value = z; opt.textContent = z;
                    zoneSelect.appendChild(opt);
                });
            }
        }

        window.__setDeliveryMethod = function(meth) {
            selectedMethod = meth;
            updateDeliveryUI();
        };

        window.__setCourier = function(cour) {
            selectedCourier = cour;
            updateDeliveryUI();
        };

        // ── Checkout ───────────────────────────────────────────────────────────────
        async function checkout() {
            if (cart.length === 0) return;
            
            const btn = el('checkout-btn');
            const custName = el('cust-name').value.trim();
            const custId = el('cust-id').value.trim();
            const custPhone = el('cust-phone').value.trim();
            const custEmail = el('cust-email').value.trim();
            const payRef = el('pay-reference').value.trim();

            if (!custName || !custId || !custPhone || !custEmail) {
                showToast('❌ LOS DATOS PERSONALES SON OBLIGATORIOS');
                return;
            }

            if (!payRef) {
                showToast('❌ SE REQUIERE EL NÚMERO DE REFERENCIA');
                return;
            }

            // Datos específicos de entrega
            let shippingDetails = '';
            if (selectedMethod === 'envio') {
                const code = el('ship-agency-code').value.trim();
                const addr = el('ship-address').value.trim();
                if (!code || !addr) { showToast('❌ COMPLETE DATOS DE AGENCIA'); return; }
                shippingDetails = \\\`🔹 *Envío Nacional:* \\\${selectedCourier}\\\\n🔹 *Agencia:* \\\${code}\\\\n🔹 *Ubicación:* \\\${addr}\\\`;
            } else if (selectedMethod === 'delivery') {
                const zone = el('delivery-zone-select').value;
                const addr = el('delivery-address').value.trim();
                if (!zone || !addr) { showToast('❌ SELECCIONE ZONA Y DIRECCIÓN'); return; }
                shippingDetails = \\\`🔹 *Delivery Local:* \\\${zone}\\\\n🔹 *Dirección:* \\\${addr}\\\`;
            } else {
                shippingDetails = \\\`🔹 *Modo:* Retiro en Agencia\\\`;
            }

            try {
                btn.disabled = true;
                btn.textContent = '⏱ PROCESANDO...';

                const total = cartTotal();

                // Track in analytics
                if (window.__analytics) {
                    cart.forEach(item => {
                        window.__analytics.trackWhatsAppClick(item.id);
                    });
                }

                // 1. Guardar en Base de Datos vía API
                const orderData = {
                    customer: {
                        name: custName,
                        email: custEmail,
                        phone: custPhone,
                        city: selectedMethod === 'delivery' ? el('delivery-zone-select').value : (selectedMethod === 'envio' ? el('ship-address').value : 'Tienda'),
                        paymentReference: payRef
                    },
                    items: cart.map(i => ({
                        productId: i.id,
                        variantId: i.variants?.[0]?.id || null, // Primera variante por defecto
                        name: i.nombre,
                        size: i.size || i.variants?.[0]?.size || 'UNICO',
                        price: getNum(i.precio),
                        qty: i.qty
                    })),
                    total: total,
                    courier: selectedMethod === 'envio' ? selectedCourier : 'otro'
                };

                const response = await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Error al procesar pedido en el sistema');
                }

                const { orderCode } = await response.json();
                const totalBs = (total * dollarRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                // WhatsApp Message Generation (Ultra-Structured)
                let msg = \\\`✦ *DISEÑO EXCLUSIVO - ATELIER FOREVER ONE* ✦\\\\n\\\`;
                msg += \\\`━━━━━━━━━━━━━━━━━━━━\\\\n\\\\n\\\`;
                msg += \\\`🆔 *ORDEN:* \\\${orderCode}\\\\n\\\\n\\\`;
                msg += \\\`👤 *CLIENTE*\\\\n\\\`;
                msg += \\\`▪️ *Nombre:* \\\${custName}\\\\n\\\`;
                msg += \\\`▪️ *Cédula:* \\\${custId}\\\\n\\\`;
                msg += \\\`▪️ *Tel:* \\\${custPhone}\\\\n\\\\n\\\`;
                
                msg += \\\`📦 *PRODUCTOS SELECCIONADOS*\\\\n\\\`;
                cart.forEach(i => {
                    msg += \\\`▪️ \\\${i.nombre} (x\\\${i.qty}) — \\\${fmtPrice(getNum(i.precio) * i.qty)}\\\\n\\\`;
                });
                msg += \\\`\\\\n\\\`;

                msg += \\\`🚚 *DETALLES DE ENTREGA*\\\\n\\\`;
                msg += \\\`\\\${shippingDetails}\\\\n\\\\n\\\`;

                msg += \\\`🏛 *RESUMEN DE PAGO*\\\\n\\\`;
                msg += \\\`💰 *Subtotal:* \\\${fmtPrice(total)}\\\\n\\\`;
                msg += \\\`💵 *Tasa BCV:* Bs. \\\${dollarRate.toFixed(2)} (+1%)\\\\n\\\`;
                msg += \\\`💸 *Total en Bolívares:* Bs. \\\${totalBs}\\\\n\\\`;
                msg += \\\`💳 *Referencia:* \\\${payRef}\\\\n\\\\n\\\`;
                
                msg += \\\`━━━━━━━━━━━━━━━━━━━━\\\\n\\\`;
                msg += \\\`_Solicitud enviada desde Atelier FO1_\\\`;
                
                window.open(\\\`https://wa.me/\\\${WHATSAPP_NUMBER}?text=\\\${encodeURIComponent(msg)}\\\`, '_blank');
                
                // Limpiar carrito tras éxito
                cart = []; saveCart(); renderCart();
                closeCart();

            } catch (e) {
                console.error(e);
                showToast('Error al procesar el pedido. Intente de nuevo.');
            } finally {
                btn.disabled = false;
                btn.textContent = 'FINALIZAR POR WHATSAPP';
            }
        }

        // ── Cart Open/Close (Full Page) ────────────────────────────────────────────
        function openCart() {
            const drawer = el('cart-drawer');
            if (!drawer) return;
            drawer.style.display = 'block';
            document.body.style.overflow = 'hidden';
            // Scroll to top of cart page
            drawer.scrollTo(0, 0);
            // Fade in
            requestAnimationFrame(() => {
                drawer.style.opacity = '1';
            });
        }
        function closeCart() {
            const drawer = el('cart-drawer');
            if (!drawer) return;
            drawer.style.opacity = '0';
            document.body.style.overflow = '';
            setTimeout(() => { drawer.style.display = 'none'; }, 400);
        }
        window.__closeCart = closeCart;

        // ── Data Fetch (legacy fallback - not used) ─────────────────────────────
        async function fetchProducts() {
            // Products now come from Supabase SSR via data-products attribute
            // This function is kept for reference only
        }

        // ── Event Listeners ────────────────────────────────────────────────────────
        function bindEvents() {
            const closeBtn = el('close-cart-btn');
            const openFab = el('open-cart-fab');
            const checkoutBtn = el('checkout-btn');

            if (closeBtn) closeBtn.onclick = closeCart;
            if (openFab) openFab.onclick = openCart;
            if (checkoutBtn) checkoutBtn.onclick = checkout;

            // Close on Escape key
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') closeCart();
            });
        }

        // ── Init ───────────────────────────────────────────────────────────────────
        function init() {
            loadCart();
            bindEvents();
            // Ya no usamos fetchProducts, los datos vienen de Supabase (SSR)
            el('loading-spinner').style.display = 'none';
            renderCategories();
            renderGrid();
            updateDeliveryUI();
            renderCart();
            initAnalytics();
        }

        // Run on DOMContentLoaded OR immediately if DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        // Also re-init on Astro View Transitions
        document.addEventListener('astro:after-swap', () => {
            if (document.getElementById('shop-root')) {
                init();
            }
        });
    })();
    </script> `, " "])), renderComponent($$result2, "Header", $$Header, { "data-astro-cid-cuzcz5z4": true }), maybeRenderHead(), renderComponent($$result2, "Hero", $$Hero, { "title": "Viste con", "highlight": "Distinción", "subtitle": "selección de prendas de calidad experta", "tagline": "Nuestros Productos", "image": "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000", "showButton": false, "data-astro-cid-cuzcz5z4": true }), addAttribute(JSON.stringify(products), "data-products"), addAttribute(urlCat, "data-url-cat"), addAttribute(urlSub, "data-url-sub"), addAttribute(dollarRate, "data-dollar-rate"), addAttribute(deliveryEnabled.toString(), "data-del-enabled"), addAttribute(deliveryZones, "data-del-zones"), dollarRate.toFixed(2), dollarRate.toFixed(2), renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-cuzcz5z4": true })) })}  ${renderScript($$result, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/ropas.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/ropas.astro", void 0);
const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/ropas.astro";
const $$url = "/ropas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ropas,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
