import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../../lib/supabase';

/**
 * Confirmar Venta — Módulo de Ventas
 * POST /api/orders/[id]/confirm-sale
 *
 * Cierra un pedido como VENTA REAL:
 *  1. Cambia status → 'entregado'
 *  2. Registra paid_at = now()
 *  3. Descuenta stock de cada variante (si no fue descontado antes)
 *  4. Incrementa total_orders en el perfil del cliente
 */
export const POST: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID de orden requerido' }), { status: 400 });
    }

    // 1. Verificar que la orden existe
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('id, status, paid_at, profile_id, order_items(id, product_id, variant_id, size, color, quantity)')
      .eq('id', id)
      .single();

    if (fetchError || !order) {
      return new Response(JSON.stringify({ error: 'Orden no encontrada' }), { status: 404 });
    }

    // 2. Cerrar la venta: status = entregado
    const updateData: any = {
      status: 'entregado',
      updated_at: new Date().toISOString(),
    };

    // Solo descontar stock si NO se descontó antes (paid_at = null)
    if (!order.paid_at) {
      updateData.paid_at = new Date().toISOString();
      await decrementStock(order.order_items || [], id);
    }

    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update(updateData)
      .eq('id', id);

    if (updateError) throw updateError;

    // 3. Incrementar total_orders del perfil del cliente
    if (order.profile_id) {
      try {
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('total_orders')
          .eq('id', order.profile_id)
          .single();

        await supabaseAdmin
          .from('profiles')
          .update({ total_orders: (profile?.total_orders || 0) + 1 })
          .eq('id', order.profile_id);
      } catch (profileErr) {
        console.error('[confirm-sale] Error actualizando total_orders:', profileErr);
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (e: any) {
    console.error('[confirm-sale] Error fatal:', e);
    return new Response(JSON.stringify({ error: e.message || 'Error interno' }), { status: 500 });
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
