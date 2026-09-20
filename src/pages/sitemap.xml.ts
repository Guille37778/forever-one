import type { APIRoute } from 'astro';
import { supabaseAdmin, initSupabase } from '../lib/supabase';

/**
 * Sitemap dinámico XML
 * GET /sitemap.xml
 * Incluye páginas estáticas + todas las prendas activas de la BD
 */
export const GET: APIRoute = async ({ locals }) => {
  // Inicializar Supabase con las variables de entorno de Cloudflare
  const env = (locals as any).runtime?.env || {};
  initSupabase(env);

  const baseUrl = 'https://foreveronefashion.com';

  // Páginas estáticas públicas
  const staticPages = [
    { url: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly' },
    { url: `${baseUrl}/ropas`, priority: '0.9', changefreq: 'daily' },
    { url: `${baseUrl}/catalogos`, priority: '0.8', changefreq: 'weekly' },
    { url: `${baseUrl}/colecciones`, priority: '0.8', changefreq: 'weekly' },
    { url: `${baseUrl}/contacto`, priority: '0.6', changefreq: 'monthly' },
  ];

  // Páginas dinámicas: productos
  let productUrls: { url: string; priority: string; changefreq: string }[] = [];
  try {
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select('id, updated_at');

    if (error) console.error('[sitemap] Error cargando productos:', error);

    if (products && products.length > 0) {
      productUrls = products.map((p: any) => ({
        url: `${baseUrl}/prenda/${p.id}`,
        priority: '0.7',
        changefreq: 'weekly',
      }));
    }
  } catch (e) {
    console.error('[sitemap] Error cargando productos:', e);
  }

  const allPages = [...staticPages, ...productUrls];
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
