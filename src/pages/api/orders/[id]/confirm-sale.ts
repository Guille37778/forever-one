import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../../lib/supabase';

/**
 * Confirmar Venta — Módulo de Ventas
 * POST /api/orders/[id]/confirm-sale
 *
 * Cierra un pedido como VENTA REAL:
 *  1. Cambia status → 'entregado'
 *  2. Registra paid_at = now()
 *  3. Descuenta stock de cada variante — ÚNICO lugar donde ocurre el descuento
 *  4. Incrementa total_orders en el perfil del cliente (solo ventas cerradas reales)
 *
 * Al confirmar la venta se entiende implícitamente que ya pasó por:
 *  ✓ Verificando pago  ✓ Pago confirmado  ✓ Marcado como enviado
 */
export const POST: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID de orden requerido' }), { status: 400 });
    }

    // 1. Verificar que la orden existe y no fue ya cerrada
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('id, status, paid_at, profile_id, order_items(*)')
      .eq('id', id)
      .single();

    if (fetchError || !order) {
      return new Response(JSON.stringify({ error: 'Orden no encontrada' }), { status: 404 });
    }

    if (order.paid_at) {
      return new Response(JSON.stringify({ error: 'Esta orden ya fue confirmada como venta' }), { status: 409 });
    }

    // 2. Cerrar la venta: status = entregado + paid_at = now()
    // Implica automáticamente: verificado → pago confirmado → enviado → cerrado
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        status: 'entregado',
        paid_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateError) throw updateError;

    // 3. Descontar stock de cada item — ÚNICO lugar donde ocurre el descuento
    const items: any[] = order.order_items || [];
    for (const item of items) {
      if (!item.variant_id) continue;
      try {
        const { data: variant } = await supabaseAdmin
          .from('variants')
          .select('stock_quantity')
          .eq('id', item.variant_id)
          .single();

        if (variant) {
          const newQty = Math.max(0, (variant.stock_quantity || 0) - (item.quantity || 1));
          await supabaseAdmin
            .from('variants')
            .update({ stock_quantity: newQty, updated_at: new Date().toISOString() })
            .eq('id', item.variant_id);
        }
      } catch (stockErr) {
        // No bloquear la confirmación si falla el stock de un item
        console.error('[confirm-sale] Error descontando stock:', stockErr);
      }
    }

    // 4. Incrementar total_orders del perfil del cliente (solo ventas cerradas cuentan)
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
        // No bloquear la confirmación si falla la actualización del perfil
        console.error('[confirm-sale] Error actualizando total_orders del perfil:', profileErr);
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (e: any) {
    console.error('[confirm-sale] Error fatal:', e);
    return new Response(JSON.stringify({ error: e.message || 'Error interno' }), { status: 500 });
  }
};
