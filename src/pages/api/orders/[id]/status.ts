import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';

/**
 * Update Order Status API
 * PUT /api/orders/[id]/status
 */
export const POST: APIRoute = async ({ request, params }) => {
  try {
    const { id } = params;
    const { status, trackingNumber, notes } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID de orden requerido' }), { status: 400 });
    }

    const updateData: any = { updated_at: new Date() };
    if (status) updateData.status = status;
    if (trackingNumber) updateData.tracking_number = trackingNumber;
    if (notes) updateData.notes = notes;

    const { error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
