import type { APIRoute } from 'astro';
import { supabaseAdmin as supabase } from '../../../lib/supabase';

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

    // 1. Preparar datos de la orden
    const validCouriers = ['zoom', 'tealca', 'mrw', 'dhl'];
    const lowerCourier = (courier || 'otro').toLowerCase();
    const finalCourier = validCouriers.includes(lowerCourier) ? lowerCourier : 'otro';

    // Guardamos la cédula y detalle extra en el campo 'notes' si es necesario
    const orderNotes = `CI: ${customer.id || 'N/A'} | Método: ${courier || 'No especificado'}`;

    // 2. Crear el registro de la orden principal
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
        status: 'verificando',
        notes: orderNotes
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error insertando orden en Supabase:', orderError);
      // No lanzamos error fatal aquí para permitir que el flujo de WhatsApp continúe en el cliente
      return new Response(JSON.stringify({ error: 'Error al registrar pedido en DB', details: orderError.message }), { status: 500 });
    }

    // 3. Insertar los items de la orden y restar stock
    for (const item of items) {
      try {
        await supabase
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

        // Restar stock
        if (item.variantId) {
          const { data: v } = await supabase.from('variants').select('stock_quantity').eq('id', item.variantId).single();
          if (v) {
            await supabase.from('variants')
              .update({ stock_quantity: Math.max(0, v.stock_quantity - item.qty) })
              .eq('id', item.variantId);
          }
        }
      } catch (itemErr) {
        console.error('Error procesando item individual:', itemErr);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      orderCode: order.order_code,
      orderId: order.id 
    }), { status: 200 });

  } catch (e: any) {
    console.error('Error fatal detectado:', e);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
};
