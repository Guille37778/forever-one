import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const GET: APIRoute = async ({ url }) => {
  const productId = url.searchParams.get('product_id');

  if (!productId) {
    return new Response(JSON.stringify({ error: 'product_id is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data: variants, error } = await supabase
    .from('variants')
    .select('id, size, color, stock_quantity, image_url')
    .eq('product_id', productId)
    .order('size');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(variants || []), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
