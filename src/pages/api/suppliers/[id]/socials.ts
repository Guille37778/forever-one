import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../../lib/supabase';

// GET /api/suppliers/:id/socials — Listar redes sociales de un proveedor
export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    const { data, error } = await supabaseAdmin
      .from('supplier_social_profiles')
      .select('*')
      .eq('supplier_id', id);

    if (error) throw error;

    return new Response(JSON.stringify({ socials: data || [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST /api/suppliers/:id/socials — Agregar red social
export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from('supplier_social_profiles')
      .insert({
        supplier_id: id,
        platform: body.platform,
        handle: body.handle || null,
        url: body.url || null,
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ social: data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE /api/suppliers/:id/socials — Eliminar red social
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const socialId = url.searchParams.get('socialId');

    if (!socialId) {
      return new Response(JSON.stringify({ error: 'socialId requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { error } = await supabaseAdmin
      .from('supplier_social_profiles')
      .delete()
      .eq('id', socialId);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
