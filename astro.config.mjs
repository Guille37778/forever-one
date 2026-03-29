// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  // 1. Tu dominio de GitHub Pages basado en tu usuario
  site: 'https://Guille37778.github.io',

  // 2. El nombre exacto de tu repositorio en GitHub
  base: '/forever-one',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [alpinejs()]
});