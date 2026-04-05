import type { APIRoute } from 'astro';
import { syncBcvRate } from '../../lib/bcv';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  
  // Security: only run if the secret is correct (or if bypass)
  const API_SECRET = import.meta.env.API_SECRET_KEY || 'fo1-secret-bcv-192837';
  
  if (secret !== API_SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const rate = await syncBcvRate();
    return new Response(JSON.stringify({ 
      success: true, 
      rate: rate.toFixed(4),
      timestamp: new Date().toISOString()
    }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
