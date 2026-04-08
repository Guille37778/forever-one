import { e as createComponent, i as renderComponent, r as renderTemplate, h as createAstro, g as addAttribute, m as maybeRenderHead } from '../../chunks/astro/server_BtsvdxdT.mjs';
import 'kleur/colors';
import { $ as $$Layout, b as $$Footer, a as $$Header } from '../../chunks/Footer_Bk7lIIhY.mjs';
import { s as supabase } from '../../chunks/supabase_FqJk9_vE.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const { data: product, error } = await supabase.from("products").select("*, subcategories(name, slug), collections(name)").eq("id", id).single();
  if (error || !product) {
    return Astro2.redirect("/404");
  }
  const { data: variants } = await supabase.from("variants").select("*").eq("product_id", id);
  const { data: recommendations } = await supabase.from("products").select("*").eq("subcategory_id", product.subcategory_id).neq("id", id).limit(4);
  const { data: reviews } = await supabase.from("product_reviews").select("*").eq("product_id", id).order("created_at", { ascending: false });
  const { data: settings } = await supabase.from("site_settings").select("value").eq("key", "bcv_usd_rate").single();
  const dollarRate = parseFloat(settings?.value || "0");
  const productInfo = {
    id: product.id,
    nombre: product.name,
    descripcion: product.description,
    precio: product.price,
    imagenes: product.image_urls || [],
    stock: variants?.reduce((sum, v) => sum + (v.stock_quantity || 0), 0) || 0,
    category: product.category,
    subcategory_name: product.subcategories?.name,
    subcategory_slug: product.subcategories?.slug,
    coleccion: product.collections?.name,
    categoria_label: product.category === "ropa" ? "Prenda" : "Accesorio"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${productInfo.nombre} | Forever One`, "data-astro-cid-mvgmbeng": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", " ", '<main class="bg-[#F9F8F6] pt-16 md:pt-24 pb-12 md:pb-20 overflow-x-hidden" data-astro-cid-mvgmbeng> <div class="max-w-7xl mx-auto px-6" data-astro-cid-mvgmbeng> <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start" data-astro-cid-mvgmbeng> <!-- \u2500\u2500 LEFT: Gallery \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 --> <div class="flex flex-col gap-6" data-astro-cid-mvgmbeng> <div class="relative group bg-white overflow-hidden shadow-2xl border border-gold/10 lg:sticky lg:top-32" data-astro-cid-mvgmbeng> <div class="aspect-square overflow-hidden" data-astro-cid-mvgmbeng> <img id="main-product-image"', "", ' class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" data-astro-cid-mvgmbeng> </div> <div class="absolute inset-0 pointer-events-none border-[12px] border-white/5 opacity-0 group-hover:opacity-100 transition-opacity" data-astro-cid-mvgmbeng></div> <!-- Additional Info Icons Inside Sticky Area --> <div class="border-t border-gold/10 pt-4 mt-2 pb-2 px-4 md:px-8" data-astro-cid-mvgmbeng> <div class="grid grid-cols-3 gap-4" data-astro-cid-mvgmbeng> <div class="flex flex-col items-center text-center" data-astro-cid-mvgmbeng> <div class="text-gold mb-1.5" data-astro-cid-mvgmbeng> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-mvgmbeng><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-astro-cid-mvgmbeng></path></svg> </div> <span class="text-[7px] uppercase tracking-[0.2em] font-black text-slate-500" data-astro-cid-mvgmbeng>Dise\xF1o Original</span> </div> <div class="flex flex-col items-center text-center" data-astro-cid-mvgmbeng> <div class="text-gold mb-1.5" data-astro-cid-mvgmbeng> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-mvgmbeng><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-astro-cid-mvgmbeng></path></svg> </div> <span class="text-[7px] uppercase tracking-[0.2em] font-black text-slate-500" data-astro-cid-mvgmbeng>Empaque Lujo</span> </div> <div class="flex flex-col items-center text-center" data-astro-cid-mvgmbeng> <div class="text-gold mb-1.5" data-astro-cid-mvgmbeng> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-mvgmbeng><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-mvgmbeng></path></svg> </div> <span class="text-[7px] uppercase tracking-[0.2em] font-black text-slate-500" data-astro-cid-mvgmbeng>Env\xEDo Inmediato</span> </div> </div> </div> </div> ', ' </div> <!-- \u2500\u2500 RIGHT: Details \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 --> <div class="flex flex-col" data-astro-cid-mvgmbeng> <div class="mb-4" data-astro-cid-mvgmbeng> <span class="text-[9px] uppercase tracking-[0.5em] font-black text-[#B8860B] mb-2 block animate-fade-in" data-astro-cid-mvgmbeng> ', " \xB7 ", ' </span> <h1 class="text-2xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tight text-black leading-[0.95] mb-6 font-primary" data-astro-cid-mvgmbeng> ', ' </h1> </div> <div class="flex items-baseline gap-4 mb-8 pb-8 border-b border-gold/10" data-astro-cid-mvgmbeng> <span class="text-3xl md:text-4xl font-black italic color-gold text-[#B8860B] font-primary" data-astro-cid-mvgmbeng>\n$', ' </span> <span class="text-sm md:text-base font-bold text-slate-400" data-astro-cid-mvgmbeng>\n\u2248 Bs. ', ' </span> </div> <!-- Description Mini --> <p class="text-xs md:text-sm text-slate-600 font-medium leading-relaxed italic mb-8 max-w-lg" data-astro-cid-mvgmbeng> ', ' </p> <!-- Sizes --> <div class="mb-8" data-astro-cid-mvgmbeng> <h3 class="text-[9px] uppercase tracking-[0.4em] font-black text-black mb-4 flex items-center gap-2" data-astro-cid-mvgmbeng>\nTallas Disponibles\n', ' </h3> <div class="flex flex-wrap gap-3" data-astro-cid-mvgmbeng> ', ' </div> </div> <!-- CTA Buttons --> <div class="flex flex-col sm:flex-row gap-4 mb-12" data-astro-cid-mvgmbeng> <button id="add-to-cart-btn"', "", ` class="flex-1 bg-black text-white text-[10px] uppercase tracking-[0.52em] font-black py-5 px-8 transition-all hover:bg-[#B8860B] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-gold/20 flex items-center justify-center gap-3" data-astro-cid-mvgmbeng>
\u2726 A\xF1adir al Carrito
</button> </div> </div> </div> <!-- \u2500\u2500 BOTTOM: Tabs Section \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 --> <section class="mt-16 pb-20" x-data="{ tab: 'reviews' }" data-astro-cid-mvgmbeng> <div class="flex justify-center gap-6 md:gap-12 border-b border-gold/10 mb-10 md:mb-16" data-astro-cid-mvgmbeng> <button @click="tab = 'reviews'" :class="tab === 'reviews' ? 'border-gold text-black' : 'border-transparent text-slate-400 hover:text-black'" class="pb-6 text-[10px] uppercase tracking-[0.5em] font-black border-b-2 transition-all" data-astro-cid-mvgmbeng>Rese\xF1as</button> <button @click="tab = 'specs'" :class="tab === 'specs' ? 'border-gold text-black' : 'border-transparent text-slate-400 hover:text-black'" class="pb-6 text-[10px] uppercase tracking-[0.5em] font-black border-b-2 transition-all" data-astro-cid-mvgmbeng>Especificaciones</button> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-20" x-show="tab === 'reviews'" data-astro-cid-mvgmbeng> <!-- Reviews Column --> <div id="reviews-section" data-astro-cid-mvgmbeng> <div class="flex justify-between items-center mb-10" data-astro-cid-mvgmbeng> <h2 class="text-xl font-black italic uppercase italic text-black" data-astro-cid-mvgmbeng>Opiniones del producto</h2> <div class="flex items-center gap-2" data-astro-cid-mvgmbeng> <div class="flex text-gold" data-astro-cid-mvgmbeng> `, ' </div> <span class="text-xs font-black italic text-gold" data-astro-cid-mvgmbeng>', ' RESE\xD1AS</span> </div> </div> <div class="flex flex-col gap-8 mb-12" data-astro-cid-mvgmbeng> ', ' </div> <!-- Write Review Form --> <div class="bg-white p-10 shadow-sm border border-gold/10 relative overflow-hidden group" data-astro-cid-mvgmbeng> <div class="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-gold/10 transition-colors" data-astro-cid-mvgmbeng></div> <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-[#B8860B] mb-10 flex items-center gap-4" data-astro-cid-mvgmbeng>\n\u2726 Escribir una rese\xF1a\n<div class="h-px flex-1 bg-gold/20" data-astro-cid-mvgmbeng></div> </h3> <form id="review-form" class="flex flex-col gap-8" x-data="{ rating: 5, hoverRating: 0 }" data-astro-cid-mvgmbeng> <input type="hidden" name="product_id"', ` data-astro-cid-mvgmbeng> <input type="hidden" name="rating" :value="rating" data-astro-cid-mvgmbeng> <div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-astro-cid-mvgmbeng> <div class="relative" data-astro-cid-mvgmbeng> <input type="text" name="name" required placeholder="SU NOMBRE" class="w-full bg-transparent border-b border-slate-200 pb-4 text-[10px] text-black uppercase tracking-widest placeholder:text-slate-400 focus:outline-none focus:border-gold transition-all peer" data-astro-cid-mvgmbeng> <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-gold peer-focus:w-full transition-all duration-500" data-astro-cid-mvgmbeng></div> </div> <div class="flex flex-col gap-3" data-astro-cid-mvgmbeng> <span class="text-[8px] uppercase tracking-widest text-slate-400 font-bold" data-astro-cid-mvgmbeng>CALIFICACI\xD3N</span> <div class="flex gap-2" data-astro-cid-mvgmbeng> <template x-for="i in 5" data-astro-cid-mvgmbeng> <button type="button" @click="rating = i" @mouseenter="hoverRating = i" @mouseleave="hoverRating = 0" class="transition-all duration-300 transform" :class="rating >= i || hoverRating >= i ? 'scale-110' : 'scale-100'" data-astro-cid-mvgmbeng> <svg class="w-6 h-6 transition-colors duration-300 stroke-current" :class="rating >= i || hoverRating >= i ? 'fill-[#B8860B] text-[#B8860B]' : 'fill-transparent text-slate-300'" viewBox="0 0 20 20" data-astro-cid-mvgmbeng> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-astro-cid-mvgmbeng></path> </svg> </button> </template> </div> </div> </div> <div class="relative" data-astro-cid-mvgmbeng> <textarea name="comment" required placeholder="SU COMENTARIO..." rows="4" class="w-full bg-transparent border-b border-slate-200 pb-4 text-[10px] text-black uppercase tracking-widest placeholder:text-slate-400 focus:outline-none focus:border-gold transition-all resize-none peer" data-astro-cid-mvgmbeng></textarea> <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-gold peer-focus:w-full transition-all duration-500" data-astro-cid-mvgmbeng></div> </div> <button type="submit" class="self-start mt-4 px-16 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B8860B] transition-all transform hover:-translate-y-1 shadow-sm" data-astro-cid-mvgmbeng>
Enviar Opini\xF3n \u2726
</button> </form> </div> </div> <!-- Recommendations Column --> <div data-astro-cid-mvgmbeng> <h2 class="text-xl font-black uppercase italic text-black mb-10" data-astro-cid-mvgmbeng>Productos similares</h2> <div class="grid grid-cols-2 gap-4 md:gap-8" data-astro-cid-mvgmbeng> `, ` </div> </div> </div> <!-- \u2500\u2500 TABS: Specs Content \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 --> <div x-show="tab === 'specs'" x-cloak class="max-w-4xl mx-auto animate-fade-in" data-astro-cid-mvgmbeng> <div class="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 bg-white p-6 md:p-12 shadow-sm border border-gold/5" data-astro-cid-mvgmbeng> <div data-astro-cid-mvgmbeng> <h4 class="text-[10px] uppercase tracking-[0.4em] font-black text-black mb-6 border-b border-gold/10 pb-2" data-astro-cid-mvgmbeng>Materiales y Cuidado</h4> <ul class="space-y-4 text-xs text-slate-600 italic leading-relaxed" data-astro-cid-mvgmbeng> <li class="flex items-start gap-3" data-astro-cid-mvgmbeng> <span class="text-gold mt-1" data-astro-cid-mvgmbeng>\u2726</span> <span data-astro-cid-mvgmbeng>Composici\xF3n premium seleccionada para durabilidad y confort excepcional.</span> </li> <li class="flex items-start gap-3" data-astro-cid-mvgmbeng> <span class="text-gold mt-1" data-astro-cid-mvgmbeng>\u2726</span> <span data-astro-cid-mvgmbeng>Limpieza profesional recomendada para preservar el acabado de lujo.</span> </li> </ul> </div> <div data-astro-cid-mvgmbeng> <h4 class="text-[10px] uppercase tracking-[0.4em] font-black text-black mb-6 border-b border-gold/10 pb-2" data-astro-cid-mvgmbeng>Detalles T\xE9cnicos</h4> <div class="space-y-4" data-astro-cid-mvgmbeng> <div class="flex justify-between border-b border-slate-50 pb-2" data-astro-cid-mvgmbeng> <span class="text-[9px] uppercase tracking-widest text-slate-400 font-bold" data-astro-cid-mvgmbeng>Colecci\xF3n</span> <span class="text-[9px] uppercase tracking-widest text-black font-black" data-astro-cid-mvgmbeng>`, '</span> </div> <div class="flex justify-between border-b border-slate-50 pb-2" data-astro-cid-mvgmbeng> <span class="text-[9px] uppercase tracking-widest text-slate-400 font-bold" data-astro-cid-mvgmbeng>Categor\xEDa</span> <span class="text-[9px] uppercase tracking-widest text-black font-black" data-astro-cid-mvgmbeng>', '</span> </div> <div class="flex justify-between border-b border-slate-50 pb-2" data-astro-cid-mvgmbeng> <span class="text-[9px] uppercase tracking-widest text-slate-400 font-bold" data-astro-cid-mvgmbeng>Disponibilidad</span> <span class="text-[9px] uppercase tracking-widest text-gold font-black italic" data-astro-cid-mvgmbeng>', `</span> </div> </div> </div> </div> </div> </section> </div> </main> <script>
        (function() {
            let selectedSize = '';

            function initCartBtn() {
                const btn = document.getElementById('add-to-cart-btn');
                if (!btn) return;

                btn.addEventListener('click', function() {
                    try {
                        const productData = JSON.parse(btn.getAttribute('data-product') || '{}');
                        productData.selectedSize = selectedSize;
                        if (window.__addToCart) {
                            window.__addToCart(productData);
                        } else {
                            console.error('__addToCart not available');
                        }
                    } catch(e) {
                        console.error('Error parsing product data', e);
                    }
                });
            }

            // Handle size selection
            window.__selectSize = function(size) {
                selectedSize = size;
                document.querySelectorAll('.size-btn').forEach(btn => {
                    const btnSize = btn.getAttribute('data-size');
                    if (btnSize === size) {
                        btn.style.borderColor = '#B8860B';
                        btn.style.color = '#B8860B';
                        btn.style.backgroundColor = 'rgba(184,134,11,0.05)';
                    } else {
                        btn.style.borderColor = '';
                        btn.style.color = '';
                        btn.style.backgroundColor = '';
                    }
                });
            };

            initCartBtn();
            document.addEventListener('astro:after-swap', initCartBtn);

            // Handle review submission
            const reviewForm = document.getElementById('review-form');
            if (reviewForm) {
                reviewForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(reviewForm);
                    const data = {
                        product_id: formData.get('product_id'),
                        reviewer_name: formData.get('name'),
                        rating: parseInt(formData.get('rating')),
                        comment: formData.get('comment')
                    };

                    try {
                        const submitBtn = reviewForm.querySelector('button[type="submit"]');
                        submitBtn.disabled = true;
                        submitBtn.textContent = 'ENVIANDO...';

                        const response = await fetch('/api/reviews', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                        });

                        const result = await response.json();

                        if (response.ok) {
                            alert('\u2726 \xA1Muchas gracias! Su rese\xF1a ha sido enviada con \xE9xito.');
                            reviewForm.reset();
                            // Opcional: recargar la p\xE1gina para ver la rese\xF1a
                            window.location.reload();
                        } else {
                            alert('\u274C ERROR: ' + (result.error || 'No se pudo enviar la rese\xF1a'));
                        }
                    } catch (err) {
                        console.error(err);
                        alert('\u274C ERROR DE CONEXI\xD3N');
                    } finally {
                        const submitBtn = reviewForm.querySelector('button[type="submit"]');
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'ENVIAR OPINI\xD3N';
                    }
                });
            }
        })();
    <\/script> `, " "])), renderComponent($$result2, "Header", $$Header, { "isBlack": true, "data-astro-cid-mvgmbeng": true }), maybeRenderHead(), addAttribute(productInfo.imagenes[0], "src"), addAttribute(productInfo.nombre, "alt"), productInfo.imagenes.length > 1 && renderTemplate`<div class="grid grid-cols-4 md:grid-cols-6 gap-4" data-astro-cid-mvgmbeng> ${productInfo.imagenes.map((img, idx) => renderTemplate`<button${addAttribute(`document.getElementById('main-product-image').src='${img}'`, "onclick")} class="aspect-[4/5] bg-white border border-gold/10 overflow-hidden hover:border-gold transition-all focus:outline-none focus:ring-1 focus:ring-gold" data-astro-cid-mvgmbeng> <img${addAttribute(img, "src")}${addAttribute(`Vista ${idx + 1}`, "alt")} class="w-full h-full object-cover" data-astro-cid-mvgmbeng> </button>`)} </div>`, productInfo.categoria_label, productInfo.coleccion || "Exclusiva", productInfo.nombre, productInfo.precio.toFixed(2), (productInfo.precio * dollarRate).toLocaleString("es-VE", { minimumFractionDigits: 2 }), productInfo.descripcion, productInfo.stock > 0 ? renderTemplate`<span class="ml-2 text-[8px] color-[#059669] bg-[#059669]/5 px-2 py-0.5 border border-[#059669]/20 font-bold lowercase tracking-normal" data-astro-cid-mvgmbeng>En stock (${productInfo.stock})</span>` : renderTemplate`<span class="ml-2 text-[8px] text-red-500 bg-red-50 px-2 py-0.5 border border-red-100 font-bold lowercase tracking-normal" data-astro-cid-mvgmbeng>Agotado</span>`, variants && variants.length > 0 ? variants.map((v) => renderTemplate`<button${addAttribute(v.stock_quantity <= 0, "disabled")}${addAttribute(`size-btn min-w-[50px] h-[50px] flex items-center justify-center border text-xs font-black transition-all ${v.stock_quantity > 0 ? "border-slate-200 hover:border-gold hover:text-gold text-black cursor-pointer" : "border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50"}`, "class")}${addAttribute(`window.__selectSize('${v.size}')`, "onclick")}${addAttribute(v.size, "data-size")} data-astro-cid-mvgmbeng> ${v.size} </button>`) : renderTemplate`<span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic" data-astro-cid-mvgmbeng>Talla única</span>`, addAttribute(JSON.stringify(productInfo), "data-product"), addAttribute(productInfo.stock <= 0, "disabled"), [1, 2, 3, 4, 5].map((_) => renderTemplate`<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" data-astro-cid-mvgmbeng><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-astro-cid-mvgmbeng></path></svg>`), reviews?.length || 0, reviews && reviews.length > 0 ? reviews.map((r) => renderTemplate`<div class="bg-white p-5 md:p-8 border border-gold/5 shadow-sm" data-astro-cid-mvgmbeng> <div class="flex justify-between mb-4" data-astro-cid-mvgmbeng> <span class="text-[10px] font-black uppercase tracking-widest text-black" data-astro-cid-mvgmbeng>${r.reviewer_name}</span> <div class="flex text-gold" data-astro-cid-mvgmbeng> ${Array.from({ length: r.rating }).map((_) => renderTemplate`<svg class="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20" data-astro-cid-mvgmbeng><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-astro-cid-mvgmbeng></path></svg>`)} </div> </div> <p class="text-xs text-slate-600 italic leading-relaxed font-medium" data-astro-cid-mvgmbeng>${r.comment}</p> </div>`) : renderTemplate`<p class="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] text-center italic py-12 bg-white/50 border border-dashed border-gold/20" data-astro-cid-mvgmbeng>Aún no hay reseñas. Sea el primero en opinar.</p>`, addAttribute(productInfo.id, "value"), recommendations && recommendations.map((p) => renderTemplate`<a${addAttribute(`/prenda/${p.id}`, "href")} class="group group bg-white shadow-sm border border-gold/5 overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2" data-astro-cid-mvgmbeng> <div class="aspect-[4/5] bg-slate-100 overflow-hidden" data-astro-cid-mvgmbeng> <img${addAttribute(p.image_urls?.[0], "src")}${addAttribute(p.name, "alt")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-astro-cid-mvgmbeng> </div> <div class="p-6" data-astro-cid-mvgmbeng> <h4 class="text-[10px] font-black italic uppercase tracking-widest text-black mb-2" data-astro-cid-mvgmbeng>${p.name}</h4> <p class="text-xs font-bold text-gold" data-astro-cid-mvgmbeng>$${p.price.toFixed(2)}</p> </div> </a>`), productInfo.coleccion || "Atelier", productInfo.categoria_label, productInfo.stock > 0 ? "Disponible" : "Bajo pedido", renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-mvgmbeng": true })) })} `;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/prenda/[id].astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/prenda/[id].astro";
const $$url = "/prenda/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
