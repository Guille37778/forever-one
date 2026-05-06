import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../../lib/supabase';

const VALID_STATUSES = ['verificando', 'preparando', 'enviado', 'entregado', 'cancelado'];

/**
 * Update Order Status API
 * POST /api/orders/[id]/status
 * Uses supabaseAdmin to bypass RLS — only callable from admin panel.
 */
export const POST: APIRoute = async ({ request, params }) => {
  try {
    const { id } = params;
    const { status, trackingNumber, notes } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID de orden requerido' }), { status: 400 });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return new Response(JSON.stringify({ error: `Estado inválido: ${status}` }), { status: 400 });
    }

    const updateData: any = { updated_at: new Date().toISOString() };
    if (status) updateData.status = status;
    if (trackingNumber !== undefined) updateData.tracking_number = trackingNumber;
    if (notes !== undefined) updateData.notes = notes;

    const { error } = await supabaseAdmin
      .from('orders')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e: any) {
    console.error('[status.ts] Error updating order status:', e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
