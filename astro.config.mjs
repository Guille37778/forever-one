import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Modo SSR para soporte dinámico (base de datos, auth, etc.)
  output: 'server',
  adapter: netlify(),
  image: {
    service: passthroughImageService()
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [alpinejs()]
});