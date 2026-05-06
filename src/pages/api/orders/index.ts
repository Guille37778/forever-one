import type { APIRoute } from 'astro';
import { supabaseAdmin as supabase } from '../../../lib/supabase';

/**
 * Endpoint de Creación de Orden
 * Recibe: cliente {name, email, phone, city}, items {productId, variantId, qty}, courier
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const { customer, items, total, courier, delivery } = await request.json();

    if (!customer || !items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Faltan datos de la orden' }), { status: 400 });
    }

    // Intentar recuperar profile_id de la sesión si no viene en el body
    let finalProfileId = customer.profileId;
    if (!finalProfileId) {
       const cookie = request.headers.get('cookie') || '';
       const token = cookie.match(/sb-access-token=([^;]+)/)?.[1];
       if (token) {
          const { data: { user: authUser } } = await supabase.auth.getUser(token);
          if (authUser) finalProfileId = authUser.id;
       }
    }

    // 1. Preparar datos de la orden
    const validCouriers = ['zoom', 'tealca', 'mrw', 'dhl'];
    const selectedCourier = (delivery?.courier || courier || 'otro').toLowerCase();
    const finalCourier = validCouriers.includes(selectedCourier) ? selectedCourier : 'otro';

    // Guardamos la cédula y detalle extra en el campo 'notes'
    let orderNotes = `CI: ${customer.id || 'N/A'}`;
    if (delivery) {
      orderNotes += ` | MÉTODO: ${delivery.method || 'N/A'}`;
      if (delivery.method === 'envio') {
         orderNotes += ` | AGENCIA: ${delivery.agency || 'N/A'} | DESTINO: ${delivery.shipAddress || 'N/A'}`;
      } else if (delivery.method === 'delivery') {
         orderNotes += ` | ZONA: ${delivery.delZone || 'N/A'} | DIRECCIÓN: ${delivery.delAddress || 'N/A'}`;
      }
    } else {
      orderNotes += ` | Método: ${courier || 'No especificado'}`;
    }

    // 2. Crear el registro de la orden principal
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        city: customer.city || delivery?.delZone || 'Desconocida',
        courier: finalCourier,
        total_usd: parseFloat(total) || 0,
        payment_reference: customer.payRef || customer.paymentReference,
        status: 'verificando',
        notes: orderNotes,
        profile_id: finalProfileId
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error insertando orden en Supabase:', orderError);
      return new Response(JSON.stringify({ error: 'Error al registrar pedido en DB', details: orderError.message }), { status: 500 });
    }

    // 2.5 Actualizar el contador de pedidos del cliente si existe profile_id
    if (finalProfileId) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('total_orders')
          .eq('id', finalProfileId)
          .single();
        
        await supabase
          .from('profiles')
          .update({ total_orders: (profile?.total_orders || 0) + 1 })
          .eq('id', finalProfileId);
      } catch (profErr) {
        console.error('Error actualizando total_orders del perfil:', profErr);
      }
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
