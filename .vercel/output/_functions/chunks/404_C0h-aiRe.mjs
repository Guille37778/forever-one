import { c as createComponent } from './astro-component_D3bPY0Kc.mjs';
import 'piccolore';
import { Q as renderTemplate, B as maybeRenderHead, a3 as addAttribute } from './sequence_BZ_GwenZ.mjs';
import { r as renderComponent } from './entrypoint_RSxQFoUR.mjs';
import { $ as $$Layout, a as $$Header, b as $$Footer } from './Footer_VeF1TjVC.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  const base = "/";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Forever One | 404 - No Encontrado", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-zetdm5md": true })} ${maybeRenderHead()}<main class="min-h-screen flex items-center justify-center bg-black relative overflow-hidden" data-astro-cid-zetdm5md> <!-- Background Elements --> <div class="absolute inset-0 opacity-10 pointer-events-none" data-astro-cid-zetdm5md> <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gold blur-[150px] rounded-full" data-astro-cid-zetdm5md></div> <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold blur-[150px] rounded-full opacity-50" data-astro-cid-zetdm5md></div> </div> <div class="relative z-10 text-center px-6" data-aos="zoom-in" data-astro-cid-zetdm5md> <h1 class="text-[12rem] md:text-[20rem] font-serif font-black italic text-white/5 tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none" data-astro-cid-zetdm5md>404</h1> <img${addAttribute(`${base}/assets/Foreverone.png`, "src")} alt="Forever One Logo" class="h-24 md:h-32 mx-auto mb-12 brightness-0 invert opacity-80" data-astro-cid-zetdm5md> <h2 class="text-4xl md:text-6xl font-serif font-black italic text-white mb-6" data-astro-cid-zetdm5md>Página No <span class="metal-gold-text" data-astro-cid-zetdm5md>Encontrada</span></h2> <p class="text-slate-400 text-sm md:text-lg font-light italic mb-12 max-w-md mx-auto tracking-wide" data-astro-cid-zetdm5md>Lo sentimos, la página que busca no existe o ha sido movida a una colección más exclusiva.</p> <a${addAttribute(`${base}`, "href")} class="inline-block btn-metal-gold px-12 py-5 text-[10px] uppercase tracking-[0.5em] font-black text-white shadow-2xl hover:scale-105 transition-all" data-astro-cid-zetdm5md>
Volver al Inicio
</a> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-zetdm5md": true })} ` })}`;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/404.astro", void 0);
const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$404,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
