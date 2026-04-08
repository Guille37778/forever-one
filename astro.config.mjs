import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import cloudflare from '@astrojs/cloudflare';

const isProduction = process.env.CF_PAGES === 'true';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  
  // Usamos el adaptador de Cloudflare para el despliegue.
  adapter: cloudflare({ mode: 'directory' }),

  security: {
    // Deshabilitamos el chequeo de origen localmente para evitar errores 403 Forbidden
    checkOrigin: !isProduction ? false : true
  },

  image: {
    service: passthroughImageService()
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [alpinejs()]
});