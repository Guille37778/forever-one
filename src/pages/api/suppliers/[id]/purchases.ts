import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../../lib/supabase';

// GET /api/suppliers/:id/purchases — Listar compras de un proveedor
export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    const { data, error } = await supabaseAdmin
      .from('supplier_purchases')
      .select('*')
      .eq('supplier_id', id)
      .order('purchase_date', { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify({ purchases: data || [] }), {
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

// POST /api/suppliers/:id/purchases — Registrar una compra
export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from('supplier_purchases')
      .insert({
        supplier_id: id,
        purchase_date: body.purchase_date,
        reference_code: body.reference_code || null,
        description: body.description || null,
        total_usd: body.total_usd || null,
        total_local: body.total_local || null,
        currency_local: body.currency_local || 'VES',
        payment_method: body.payment_method || null,
        items_summary: body.items_summary || [],
        notes: body.notes || null,
        quality_rating: body.quality_rating || null,
        punctuality_rating: body.punctuality_rating || null,
        communication_rating: body.communication_rating || null,
        price_rating: body.price_rating || null,
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ purchase: data }), {
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

// DELETE /api/suppliers/:id/purchases — Eliminar una compra
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const purchaseId = url.searchParams.get('purchaseId');

    if (!purchaseId) {
      return new Response(JSON.stringify({ error: 'purchaseId requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { error } = await supabaseAdmin
      .from('supplier_purchases')
      .delete()
      .eq('id', purchaseId);

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
