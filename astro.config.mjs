import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import deno from '@astrojs/deno';

// https://astro.build/config
export default defineConfig({
  // Volvemos a modo servidor (SSR) para que funcionen las rutas dinámicas y Supabase
  output: 'server',
  
  // Adaptador oficial para Deno Deploy
  adapter: deno(),

  security: {
    checkOrigin: true
  },

  image: {
    service: passthroughImageService()
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [alpinejs()]
});