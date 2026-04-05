import { c as createComponent } from './astro-component_D3bPY0Kc.mjs';
import 'piccolore';
import { B as maybeRenderHead, a3 as addAttribute, Q as renderTemplate } from './sequence_BZ_GwenZ.mjs';
import 'clsx';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Hero;
  const {
    title = "Forever",
    highlight = "One",
    subtitle = "siempre único",
    tagline = "Casa de Moda de Alto Nivel",
    image = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000",
    showButton = true,
    buttonText = "Ver Productos",
    buttonLink = "/ropas"
  } = Astro2.props;
  const base = "/";
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanLink = buttonLink.startsWith("/") ? buttonLink : `/${buttonLink}`;
  const fullButtonLink = buttonLink.startsWith("http") ? buttonLink : `${cleanBase}${cleanLink}`;
  return renderTemplate`${maybeRenderHead()}<section class="relative min-h-[85vh] md:min-h-screen flex items-center justify-center bg-black overflow-hidden" data-astro-cid-anhloy43> <div class="absolute inset-0 z-0" data-astro-cid-anhloy43> <img${addAttribute(image, "src")} alt="Luxury Fashion Hero" class="w-full h-full object-cover opacity-50 animate-heroZoom" data-astro-cid-anhloy43> <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" data-astro-cid-anhloy43></div> </div> <div class="container mx-auto px-6 relative z-10 text-center mt-20" data-astro-cid-anhloy43> <div class="mb-6 opacity-0 animate-heroUp" style="animation-delay: 0.2s; animation-fill-mode: forwards;" data-astro-cid-anhloy43> <span class="text-gold font-bold tracking-[0.5em] uppercase text-[9px] md:text-[11px] border-b border-gold/30 pb-2" data-astro-cid-anhloy43>${tagline}</span> </div> <h1 class="text-5xl md:text-9xl font-serif font-black tracking-tighter mb-4 italic leading-tight opacity-0 animate-heroUp" style="animation-delay: 0.5s; animation-fill-mode: forwards;" data-astro-cid-anhloy43> ${title} <span class="metal-gold-text inline-block -ml-2 md:-ml-4 pr-12" data-astro-cid-anhloy43>${highlight}</span> </h1> <h2 class="text-lg md:text-3xl font-light tracking-[0.3em] text-gray-400 uppercase italic mb-12 opacity-0 animate-heroUp pr-8" style="animation-delay: 0.8s; animation-fill-mode: forwards;" data-astro-cid-anhloy43> <span class="text-white" data-astro-cid-anhloy43>${subtitle.split(" ")[0]}</span> ${subtitle.split(" ").slice(1).join(" ")} </h2> ${showButton && renderTemplate`<div class="opacity-0 animate-heroUp" style="animation-delay: 1.1s; animation-fill-mode: forwards;" data-astro-cid-anhloy43> <a${addAttribute(fullButtonLink, "href")} class="inline-block px-12 py-5 bg-gold text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 hover:scale-105 soft-shadow border border-white/10" data-astro-cid-anhloy43> ${buttonText} </a> </div>`} </div> </section>`;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/components/sections/Hero.astro", void 0);

export { $$Hero as $ };
