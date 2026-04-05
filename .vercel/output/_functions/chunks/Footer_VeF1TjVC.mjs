import { c as createComponent } from './astro-component_D3bPY0Kc.mjs';
import 'piccolore';
import { a3 as addAttribute, Q as renderTemplate, ba as renderSlot, b9 as renderHead, B as maybeRenderHead } from './sequence_BZ_GwenZ.mjs';
import { r as renderComponent } from './entrypoint_RSxQFoUR.mjs';
import 'clsx';
import { r as renderScript } from './script_C8kPsTrl.mjs';
import { s as supabase } from './supabase_CUGkxkOG.mjs';

const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/node_modules/astro/components/ClientRouter.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Forever One | Luxury Experience - High-End Fashion House" } = Astro2.props;
  const base = "/".replace(/\/$/, "");
  return renderTemplate(_a || (_a = __template(['<html lang="es" class="scroll-smooth" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description"', '><meta name="viewport" content="width=device-width"><link rel="icon" type="image/png"', '><meta name="generator"', "><title>", `</title><!-- Google Fonts --><link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@300;400;700&family=Montserrat:wght@300;400;700;900&display=swap" rel="stylesheet"><!-- AOS (Animaciones) --><link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"><script src="https://unpkg.com/lenis@1.1.20/dist/lenis.min.js"></script><script>
			window.addEventListener('DOMContentLoaded', () => {
				const lenis = new Lenis();
				function raf(time) {
					lenis.raf(time);
					requestAnimationFrame(raf);
				}
				requestAnimationFrame(raf);
			});
		</script>`, "", `</head> <body class="bg-black text-white font-sans antialiased" x-data="{ mobileMenuOpen: false, atTop: true }" :class="{ 'overflow-hidden': mobileMenuOpen }" @scroll.window="atTop = (window.pageYOffset > 50 ? false : true)" data-astro-cid-sckkx6r4> <div id="preloader" data-astro-cid-sckkx6r4> <div class="loader-logo metal-gold-bg shadow-[0_0_40px_rgba(184,134,11,0.2)]"`, ' data-astro-cid-sckkx6r4></div> </div> <div class="cursor-dot hidden md:block" id="cursor-dot" data-astro-cid-sckkx6r4></div> <div class="cursor-outline hidden md:block" id="cursor-outline" data-astro-cid-sckkx6r4></div> ', ` <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script> <script>
			// Inicializar AOS
			AOS.init({ once: true, duration: 1000 });

			// Lógica del Preloader
			window.addEventListener('load', () => {
				const preloader = document.getElementById('preloader');
				if (preloader) preloader.classList.add('fade-out');
			});

			// Lógica del Cursor Personalizado
			document.addEventListener('mousemove', (e) => {
				const dot = document.getElementById('cursor-dot');
				const outline = document.getElementById('cursor-outline');
				if (dot && outline) {
					dot.style.left = e.clientX + 'px';
					dot.style.top = e.clientY + 'px';
					outline.style.left = (e.clientX - 12) + 'px';
					outline.style.top = (e.clientY - 12) + 'px';
				}
			});

			document.addEventListener('mousedown', () => {
				const outline = document.getElementById('cursor-outline');
				if (outline) outline.style.transform = 'scale(0.8)';
			});

			document.addEventListener('mouseup', () => {
				const outline = document.getElementById('cursor-outline');
				if (outline) outline.style.transform = 'scale(1)';
			});

			// Re-inicializar AOS y Cursor al navegar con View Transitions
			document.addEventListener('astro:after-swap', () => {
				AOS.init({ once: true, duration: 1000 });
				const preloader = document.getElementById('preloader');
				if (preloader) preloader.classList.add('fade-out');
			});
		</script> </body> </html>`])), addAttribute(description, "content"), addAttribute(`${base}/logo_circular.png`, "href"), addAttribute(Astro2.generator, "content"), title, renderComponent($$result, "ClientRouter", $$ClientRouter, { "data-astro-cid-sckkx6r4": true }), renderHead(), addAttribute(`-webkit-mask-image: url(${base}/logo_circular.png); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center; mask-image: url(${base}/logo_circular.png); mask-size: contain; mask-repeat: no-repeat; mask-position: center;`, "style"), renderSlot($$result, $$slots["default"]));
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/layouts/Layout.astro", void 0);

const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const base = "/".replace(/\/$/, "");
  const { data: subcategories } = await supabase.from("subcategories").select("*").order("name", { ascending: true });
  const ropaSub = subcategories?.filter((s) => s.parent_category === "ropa") || [];
  const accesoriosSub = subcategories?.filter((s) => s.parent_category === "accesorios") || [];
  return renderTemplate`${maybeRenderHead()}<nav :class="{ 'py-4 glass-nav border-b border-gold/20': !atTop || mobileMenuOpen, 'py-8 bg-transparent': atTop && !mobileMenuOpen }" class="fixed top-0 w-full z-[1000] transition-all duration-500"> <div class="max-w-7xl mx-auto px-6 flex items-center justify-between"> <a${addAttribute(`${base}`, "href")} class="group relative z-[1100] flex items-center gap-4"> <!-- Dynamic Logo Container using CSS Mask - Permanently Gold --> <div class="metal-gold-bg shadow-[0_0_20px_rgba(184,134,11,0.3)] h-10 md:h-14 w-10 md:w-14 transition-all duration-500 group-hover:scale-110"${addAttribute(`-webkit-mask-image: url(${base}/logo_circular.png); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center; mask-image: url(${base}/logo_circular.png); mask-size: contain; mask-repeat: no-repeat; mask-position: center;`, "style")} aria-label="Forever One Logo"></div> <span class="text-xl md:text-3xl font-serif font-black italic tracking-tighter text-white pr-4">
Forever <span class="metal-gold-text inline-block -ml-0.5 md:-ml-2 pr-6">One</span> </span> </a> <div class="hidden lg:flex items-center gap-8"> <a${addAttribute(`${base}`, "href")} class="nav-link">Inicio</a> <a${addAttribute(`${base}/catalogos`, "href")} class="nav-link">Catálogos</a> <!-- Dropdown Prendas --> <div class="relative group" x-data="{ open: false }" @click.away="open = false"> <button @click="open = !open" class="nav-link flex items-center gap-1 outline-none group">
Prendas
<svg :class="open ? 'rotate-180' : ''" class="w-3 h-3 transition-transform duration-300 text-gold/60 group-hover:text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </button> <!-- Dropdown Menu --> <div x-show="open" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0" x-cloak class="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[400px] bg-black/95 backdrop-blur-xl border border-gold/20 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"> <div class="grid grid-cols-2 gap-8"> <!-- Column 1: Ropa --> <div> <p class="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-4 border-b border-gold/10 pb-2">Ropa</p> <div class="space-y-3"> <a${addAttribute(`${base}/ropas?cat=ropa`, "href")} class="block text-[11px] text-white/70 hover:text-gold transition-colors uppercase tracking-wider">Ver Todo</a> ${ropaSub.map((sub) => renderTemplate`<a${addAttribute(`${base}/ropas?sub=${sub.slug}`, "href")} class="block text-[11px] text-white/50 hover:text-gold transition-colors uppercase tracking-wider italic"> ${sub.name} </a>`)} </div> </div> <!-- Column 2: Accesorios --> <div> <p class="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-4 border-b border-gold/10 pb-2">Accesorios</p> <div class="space-y-3"> <a${addAttribute(`${base}/ropas?cat=accesorios`, "href")} class="block text-[11px] text-white/70 hover:text-gold transition-colors uppercase tracking-wider">Ver Todo</a> ${accesoriosSub.map((sub) => renderTemplate`<a${addAttribute(`${base}/ropas?sub=${sub.slug}`, "href")} class="block text-[11px] text-white/50 hover:text-gold transition-colors uppercase tracking-wider italic"> ${sub.name} </a>`)} </div> </div> </div> </div> </div> <a${addAttribute(`${base}/contacto`, "href")} class="ml-4 px-6 py-2 border border-gold/40 text-gold text-[9px] uppercase tracking-[0.2em] font-medium hover:bg-gold hover:text-black transition-all duration-500">
Contacto
</a> </div> <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden relative z-[1100] p-2 outline-none focus:outline-none" aria-label="Menú"> <div class="w-6 space-y-1.5"> <span :class="mobileMenuOpen ? 'bg-gold rotate-45 translate-y-2' : (atTop ? 'bg-white' : 'bg-gold')" class="block h-0.5 w-full transition-all duration-300 origin-center"></span> <span :class="mobileMenuOpen ? 'opacity-0' : (atTop ? 'bg-white' : 'bg-gold')" class="block h-0.5 w-full transition-all duration-300"></span> <span :class="mobileMenuOpen ? 'bg-gold -rotate-45 -translate-y-2' : (atTop ? 'bg-white' : 'bg-gold')" class="block h-0.5 w-full transition-all duration-300 origin-center"></span> </div> </button> </div> </nav> <div x-show="mobileMenuOpen" x-transition:enter="transition ease-out duration-400" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition ease-in duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" x-cloak class="fixed inset-0 bg-black z-[900] flex flex-col justify-center items-center"> <div class="flex flex-col gap-8 text-center px-6"> <a @click="mobileMenuOpen = false"${addAttribute(`${base}`, "href")} class="text-[11px] uppercase tracking-[0.3em] text-white/90 hover:text-gold transition-colors font-medium">Inicio</a> <a @click="mobileMenuOpen = false"${addAttribute(`${base}/catalogos`, "href")} class="text-[11px] uppercase tracking-[0.3em] text-white/90 hover:text-gold transition-colors font-medium">Catálogos</a> <div x-data="{ expanded: false }"> <button @click="expanded = !expanded" class="w-full text-[11px] uppercase tracking-[0.3em] text-white/90 hover:text-gold transition-colors font-medium flex items-center justify-center gap-2">
Prendas
<svg :class="expanded ? 'rotate-180' : ''" class="w-3 h-3 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </button> <div x-show="expanded" x-collapse x-cloak class="mt-4 space-y-3 bg-white/5 p-4"> <a @click="mobileMenuOpen = false"${addAttribute(`${base}/ropas`, "href")} class="block text-[9px] text-gold/80 hover:text-gold uppercase tracking-widest">Ver Todas las Prendas</a> <p class="text-[8px] text-white/30 uppercase tracking-[0.4em] pt-2 border-t border-white/5">Categorías</p> ${subcategories?.map((sub) => renderTemplate`<a @click="mobileMenuOpen = false"${addAttribute(`${base}/ropas?sub=${sub.slug}`, "href")} class="block text-[10px] text-white/60 hover:text-gold uppercase tracking-widest italic"> ${sub.name} </a>`)} </div> </div> <div class="mt-4"> <a @click="mobileMenuOpen = false"${addAttribute(`${base}/contacto`, "href")} class="inline-block px-10 py-4 border border-gold/50 text-gold text-[9px] uppercase tracking-[0.2em] font-medium hover:bg-gold hover:text-black transition-all">
Contacto
</a> </div> </div> <div class="absolute bottom-10 left-0 w-full text-center opacity-5 pointer-events-none"> <span class="text-[7rem] font-serif font-black text-gold italic">FO1</span> </div> </div>`;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const base = "/".replace(/\/$/, "");
  return renderTemplate`${maybeRenderHead()}<footer class="relative bg-black pt-20 pb-10 border-t border-white/5 overflow-hidden w-full"> <div class="max-w-7xl mx-auto px-6 relative z-10"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-center lg:text-left"> <div data-aos="fade-up"> <a${addAttribute(`${base}`, "href")} class="inline-block mb-6"> <span class="text-2xl font-serif font-black italic tracking-tighter text-white pr-4">
Forever <span class="metal-gold-text inline-block -ml-1 pr-6">One</span> </span> </a> <p class="text-slate-500 text-xs leading-relaxed mb-8 italic max-w-xs mx-auto lg:mx-0">
"El Emblema de Distinción". Redefiniendo el lujo contemporáneo a través de la exclusividad textil.
</p> <div class="flex justify-center lg:justify-start gap-5"> <a href="https://www.instagram.com/foreveronefashion?igsh=MXdvZDE4b2Ziajh1MA==" class="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-500 shadow-lg shadow-gold/5"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg> </a> <a href="https://www.tiktok.com/@foreveronefashion?_r=1&_t=ZS-94bnu6iArP3" class="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-500 shadow-lg shadow-gold/5"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.417 6.417 0 01-1.87-1.54v8.13c.01 2.15-.45 4.33-1.74 6.02-1.31 1.73-3.43 2.78-5.57 2.69-2.23-.05-4.43-1.12-5.74-2.93-1.31-1.81-1.58-4.22-.73-6.28.84-2.03 2.87-3.53 5.06-3.72v4.05c-1.28.11-2.52.84-3.13 1.96-.61 1.12-.5 2.54.29 3.5.79.97 2.11 1.35 3.3.97 1.19-.38 2.02-1.53 2.02-2.78V.02z"></path></svg> </a> <a href="https://wa.me/584244557693" class="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-500 shadow-lg shadow-gold/5"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.67-1.614-.918-2.213-.242-.588-.487-.51-.67-.51-.172-.001-.371-.001-.57-.001-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg> </a> </div> </div> <div data-aos="fade-up" data-aos-delay="200"> <h4 class="text-white font-bold uppercase tracking-[0.4em] text-[10px] mb-8">Navegación</h4> <ul class="space-y-4 text-[11px] uppercase tracking-widest"> <li><a${addAttribute(`${base}`, "href")} class="text-slate-500 hover:text-gold transition-colors">Inicio</a></li> <li><a${addAttribute(`${base}/catalogos`, "href")} class="text-slate-500 hover:text-gold transition-colors">Catálogos</a></li>  <li><a${addAttribute(`${base}/ropas`, "href")} class="text-slate-500 hover:text-gold transition-colors">Prendas</a></li> </ul> </div> <div data-aos="fade-up" data-aos-delay="400"> <h4 class="text-white font-bold uppercase tracking-[0.4em] text-[10px] mb-8">Legal</h4> <ul class="space-y-4 text-[11px] uppercase tracking-widest"> <li><a href="#" class="text-slate-500 hover:text-gold transition-colors">Privacidad</a></li> <li><a href="#" class="text-slate-500 hover:text-gold transition-colors">Términos</a></li> <li><a href="#" class="text-slate-500 hover:text-gold transition-colors">Cookies</a></li> </ul> </div> <div data-aos="fade-up" data-aos-delay="600"> <h4 class="text-white font-bold uppercase tracking-[0.4em] text-[10px] mb-8">Contacto</h4> <p class="text-slate-500 text-[11px] uppercase tracking-widest mb-6">Asesoría de Compras Global</p> <a href="https://wa.me/584244557693" class="group flex items-center justify-center lg:justify-start gap-4 text-gold font-black uppercase text-[10px] tracking-[0.3em]"> <span>Chat Directo</span> <div class="w-8 h-px bg-gold/50 group-hover:w-12 transition-all duration-500"></div> </a> </div> </div> <div class="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8"> <span class="text-[9px] text-slate-700 uppercase tracking-[0.5em] text-center">
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Forever One — High End Fashion House
</span> <span class="text-[9px] text-slate-700 uppercase tracking-[0.5em]">
Hecho con distinción
</span> </div> </div> <div class="absolute -bottom-10 -left-10 opacity-[0.02] pointer-events-none select-none"> <span class="text-[20rem] font-serif font-black text-white leading-none italic">FO1</span> </div> </footer>`;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/components/Footer.astro", void 0);

export { $$Layout as $, $$Header as a, $$Footer as b };
