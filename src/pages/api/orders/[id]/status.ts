import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../../lib/supabase';

const VALID_STATUSES = ['verificando', 'preparando', 'enviado', 'entregado', 'cancelado'];

/**
 * Update Order Status API
 * POST /api/orders/[id]/status
 * 
 * Cuando el status cambia a "preparando" (confirmar pago):
 *  → Se descuenta el stock de cada variante del pedido
 *  → Se registra paid_at = now()
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

    // Obtener la orden actual con sus items
    const { data: currentOrder, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('id, status, paid_at, order_items(id, product_id, variant_id, size, color, quantity)')
      .eq('id', id)
      .single();

    if (fetchError || !currentOrder) {
      return new Response(JSON.stringify({ error: 'Orden no encontrada' }), { status: 404 });
    }

    const updateData: any = { updated_at: new Date().toISOString() };
    if (status) updateData.status = status;
    if (trackingNumber !== undefined) updateData.tracking_number = trackingNumber;
    if (notes !== undefined) updateData.notes = notes;

    // Descontar stock cuando se confirma pago (preparando) y NO se haya descontado antes
    if (status === 'preparando' && !currentOrder.paid_at) {
      updateData.paid_at = new Date().toISOString();
      await decrementStock(currentOrder.order_items || [], id);
    }

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

/**
 * Descuenta stock de cada item del pedido.
 * Si el item no tiene variant_id, lo busca por product_id + size + color.
 */
async function decrementStock(items: any[], orderId: string) {
  for (const item of items) {
    try {
      let variantId = item.variant_id;

      // Si no tiene variant_id, buscarlo por product_id + size + color
      if (!variantId && item.product_id) {
        const itemSize = item.size || 'UNICO';
        const itemColor = item.color || '';

        let query = supabaseAdmin
          .from('variants')
          .select('id')
          .eq('product_id', item.product_id)
          .eq('size', itemSize);

        if (itemColor && itemColor.trim() !== '') {
          query = query.eq('color', itemColor);
        } else {
          query = query.or('color.is.null,color.eq.');
        }

        const { data: foundVariant } = await query.limit(1).maybeSingle();
        if (foundVariant) {
          variantId = foundVariant.id;
          // Guardar el variant_id en el order_item para futuros usos
          await supabaseAdmin
            .from('order_items')
            .update({ variant_id: variantId })
            .eq('id', item.id);
        }
      }

      if (!variantId) {
        console.warn(`[stock] Item ${item.id} sin variante encontrada, saltando`);
        continue;
      }

      // Descontar stock
      const { data: variant } = await supabaseAdmin
        .from('variants')
        .select('stock_quantity')
        .eq('id', variantId)
        .single();

      if (variant) {
        const newQty = Math.max(0, (variant.stock_quantity || 0) - (item.quantity || 1));
        await supabaseAdmin
          .from('variants')
          .update({ stock_quantity: newQty, updated_at: new Date().toISOString() })
          .eq('id', variantId);
        console.log(`[stock] ✅ Variante ${variantId}: ${variant.stock_quantity} → ${newQty}`);
      }
    } catch (stockErr) {
      console.error('[stock] Error descontando stock:', stockErr);
    }
  }
  console.log(`[stock] ✅ Stock actualizado para orden ${orderId} (${items.length} items)`);
}
