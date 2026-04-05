import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Modo SSR para soporte dinámico (base de datos, auth, etc.)
  output: 'server',
  adapter: vercel(),
  image: {
    service: passthroughImageService()
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [alpinejs()]
});