import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dominio principal del sitio (requerido para el sitemap)
  site: 'https://foreveronefashion.com',

  // Volvemos a modo servidor (SSR) para que funcionen las rutas dinámicas y Supabase
  output: 'server',
  
  // Adaptador para Cloudflare Pages
  adapter: cloudflare(),

  security: {
    checkOrigin: true
  },

  image: {
    service: passthroughImageService()
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    alpinejs({
      entrypoint: '/src/scripts/alpine.ts',
    }),
    sitemap({
      // Excluir rutas de administración y 404
      filter: (page) =>
        !page.includes('/admin/') &&
        !page.includes('/404'),
    }),
  ]
});