import type { APIRoute } from 'astro';
import { supabaseAdmin as supabase, initSupabase } from '../../../lib/supabase';
import { Resend } from 'resend';

/**
 * Endpoint de Creación de Orden
 * Recibe: cliente {name, email, phone, city}, items {productId, variantId, qty}, courier
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const env = (locals as any).runtime?.env || {};
    initSupabase(env);

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
        // El carrito guarda los campos como 'nombre'/'precio'/'id'; normalizamos ambas convenciones
        const itemName  = item.nombre  || item.name  || 'Producto';
        const itemPrice = parseFloat(item.precio || item.price || 0);
        const itemProductId = item.productId || item.id || null;

        let finalVariantId = item.variantId;
        
        if (!finalVariantId && itemProductId) {
          const itemSize = item.size || 'UNICO';
          const itemColor = item.color || '';
          
          const { data: v } = await supabase
            .from('variants')
            .select('id')
            .eq('product_id', itemProductId)
            .eq('size', itemSize)
            .eq('color', itemColor)
            .limit(1)
            .maybeSingle();
            
          if (v) {
            finalVariantId = v.id;
          }
        }

        await supabase
          .from('order_items')
          .insert({
            order_id: order.id,
            product_id: itemProductId,
            variant_id: finalVariantId || null,
            product_name: itemName,
            size: item.size,
            color: item.color || '',
            price_usd: itemPrice,
            quantity: parseInt(item.qty) || 1
          });

        // Restar stock
        if (finalVariantId) {
          const { data: v } = await supabase.from('variants').select('stock_quantity').eq('id', finalVariantId).single();
          if (v) {
            await supabase.from('variants')
              .update({ stock_quantity: Math.max(0, v.stock_quantity - item.qty) })
              .eq('id', finalVariantId);
          }
        }
      } catch (itemErr) {
        console.error('Error procesando item individual:', itemErr);
      }
    }

    // 4. Enviar el comprobante de pago por correo electrónico vía Resend
    if (customer.payCaptureBase64) {
      try {
        const resend = new Resend('re_2A3vN2Db_P9tdTA7TSUKTdr4Kgj18SeQ3');
        
        // El Base64 del frontend viene como "data:image/jpeg;base64,....."
        let base64Data = customer.payCaptureBase64;
        if (base64Data.includes('base64,')) {
          base64Data = base64Data.split('base64,')[1];
        }

        const itemsHtml = items.map((i: any) => {
          const n = i.nombre || i.name || 'Producto';
          const p = parseFloat(i.precio || i.price || 0);
          return `<li>${i.qty}x ${n} ${i.size ? `(Talla: ${i.size})` : ''} - $${(p * i.qty).toFixed(2)}</li>`;
        }).join('');

        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'contactoforeverone@gmail.com',
          subject: `Nuevo Pago Móvil Recibido - Orden #${order.order_code || 'N/A'}`,
          html: `
            <h2>Nuevo Pago Móvil Adjunto</h2>
            <p><strong>Orden:</strong> #${order.order_code || 'N/A'}</p>
            <p><strong>Cliente:</strong> ${customer.name}</p>
            <p><strong>Cédula:</strong> ${customer.id}</p>
            <p><strong>Teléfono:</strong> ${customer.phone}</p>
            <p><strong>Referencia:</strong> ${customer.payRef}</p>
            <p><strong>Total:</strong> $${parseFloat(total).toFixed(2)}</p>
            <h3>Artículos:</h3>
            <ul>${itemsHtml}</ul>
            <p>Se adjunta el comprobante de pago.</p>
          `,
          attachments: [
            {
              filename: customer.payCaptureName || 'comprobante.jpg',
              content: base64Data,
            }
          ]
        });
      } catch (emailErr) {
        console.error('Error al enviar el correo con Resend:', emailErr);
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
