import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import netlify from '@astrojs/netlify';

const isProduction = process.env.NETLIFY === 'true';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  
  // Solo usamos el adaptador de Netlify en producción.
  // En desarrollo (Local), usamos el servidor interno de Astro para evitar bloqueos en POST.
  adapter: isProduction ? netlify() : undefined,

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