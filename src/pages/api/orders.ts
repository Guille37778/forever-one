import type { APIRoute } from 'astro';
import { supabaseAdmin as supabase } from '../../lib/supabase';

/**
 * Endpoint de Creación de Orden
 * Recibe: cliente {name, email, phone, city}, items {productId, variantId, qty}, courier
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const { customer, items, total, courier } = await request.json();

    if (!customer || !items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Faltan datos de la orden' }), { status: 400 });
    }

    // 1. Crear el registro de la orden principal
    // lowercase courier because Postgres enum is case-sensitive ('zoom', 'tealca', 'mrw', 'dhl', 'otro')
    const finalCourier = (courier || 'otro').toLowerCase();

    // Nota: order_code se genera automáticamente via trigger en la DB (migration.sql)
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        city: customer.city || 'Desconocida',
        courier: finalCourier,
        total_usd: parseFloat(total) || 0,
        payment_reference: customer.paymentReference,
        status: 'verificando'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error insertando orden en Supabase:', orderError);
      throw new Error(`Error en base de datos: ${orderError.message}`);
    }

    // 2. Insertar los items de la orden y restar stock
    for (const item of items) {
      // Registrar item
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: order.id,
          product_id: item.productId,
          variant_id: item.variantId,
          product_name: item.name,
          size: item.size,
          price_usd: parseFloat(item.price) || 0,
          quantity: parseInt(item.qty) || 1
        });

      if (itemError) {
        console.error('Error insertando item de orden:', itemError);
        throw new Error(`Error en items de orden: ${itemError.message}`);
      }

      // Restar stock de la variante
      if (item.variantId) {
        const { data: currentVariant, error: variantFetchError } = await supabase
          .from('variants')
          .select('stock_quantity')
          .eq('id', item.variantId)
          .single();

        if (variantFetchError) {
          console.warn('No se pudo obtener stock para actualizar:', variantFetchError);
        } else if (currentVariant) {
          const { error: stockUpdateError } = await supabase
            .from('variants')
            .update({ stock_quantity: Math.max(0, currentVariant.stock_quantity - item.qty) })
            .eq('id', item.variantId);
          
          if (stockUpdateError) {
            console.error('Error actualizando stock:', stockUpdateError);
          }
        }
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      orderCode: order.order_code,
      orderId: order.id 
    }), { status: 200 });

  } catch (e: any) {
    console.error('Error fatal creando orden:', e);
    return new Response(JSON.stringify({ error: e.message || 'Error interno del servidor' }), { status: 500 });
  }
};
