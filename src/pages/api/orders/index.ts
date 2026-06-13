import type { APIRoute } from 'astro';
import { supabaseAdmin as supabase, initSupabase } from '../../../lib/supabase';

// ─── Telegram Bot API Helper ────────────────────────────────────────────────
const TELEGRAM_TOKEN  = '8746821618:AAH-gzDhFA25BQ_W0JQkjMEt_tlOJ6iGOnM';
const TELEGRAM_CHAT   = '1289209353';
const TG_API          = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

async function sendTelegramNotification(
  captureBase64: string,
  captureName:   string,
  caption:       string
): Promise<void> {
  // 1. Convertir Base64 → Blob para enviar como archivo real
  let b64 = captureBase64;
  let mimeType = 'image/jpeg';
  if (b64.includes('base64,')) {
    const parts = b64.split('base64,');
    const header = parts[0]; // ej: "data:image/png;"
    b64 = parts[1];
    const mimeMatch = header.match(/data:([^;]+)/);
    if (mimeMatch) mimeType = mimeMatch[1];
  }

  // Decodificar Base64 a bytes
  const byteChars   = atob(b64);
  const byteNumbers = new Uint8Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  const blob = new Blob([byteNumbers], { type: mimeType });

  // 2. Enviar foto con el resumen como caption
  const form = new FormData();
  form.append('chat_id', TELEGRAM_CHAT);
  form.append('photo',   blob, captureName || 'comprobante.jpg');
  form.append('caption', caption);
  form.append('parse_mode', 'HTML');

  const res = await fetch(`${TG_API}/sendPhoto`, { method: 'POST', body: form });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Telegram sendPhoto falló: ${errBody}`);
  }
}

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
          
          let query = supabase
            .from('variants')
            .select('id')
            .eq('product_id', itemProductId)
            .eq('size', itemSize);
            
          if (itemColor === '') {
            query = query.or('color.is.null,color.eq.');
          } else {
            query = query.eq('color', itemColor);
          }
          
          const { data: v } = await query.limit(1).maybeSingle();
            
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

    // 4. Enviar comprobante de pago + resumen a Telegram
    if (customer.payCaptureBase64) {
      try {
        // Detectar método de pago para el mensaje
        const payMethodLabel: Record<string, string> = {
          pagoMovil: '📱 Pago Móvil',
          zelle:     '🟣 Zelle',
          binance:   '🟡 Binance Pay',
        };
        const metodoPago = payMethodLabel[customer.payMethod || ''] || '💳 Pago';

        // Construir lista de artículos
        const itemsText = items.map((i: any) => {
          const n = i.nombre || i.name || 'Producto';
          const p = parseFloat(i.precio || i.price || 0);
          const talla = i.size ? ` · Talla: ${i.size}` : '';
          const color = i.color ? ` · Color: ${i.color}` : '';
          return `  • ${i.qty}x ${n}${talla}${color} — $${(p * i.qty).toFixed(2)}`;
        }).join('\n');

        // Construir info de entrega
        let entregaText = '';
        if (delivery?.method === 'envio') {
          entregaText = `🚚 <b>Envío:</b> ${delivery.agency || 'N/A'}\n📍 <b>Destino:</b> ${delivery.shipAddress || 'N/A'}`;
        } else if (delivery?.method === 'delivery') {
          entregaText = `🛵 <b>Delivery:</b> ${delivery.delZone || 'N/A'}\n📍 <b>Dirección:</b> ${delivery.delAddress || 'N/A'}`;
        } else {
          entregaText = `📦 <b>Retiro en tienda</b>`;
        }

        const caption = [
          `🛍️ <b>NUEVO PEDIDO #${order.order_code || order.id}</b>`,
          ``,
          `👤 <b>Cliente:</b> ${customer.name}`,
          `🪪 <b>Cédula:</b> ${customer.id || 'N/A'}`,
          `📞 <b>Teléfono:</b> ${customer.phone}`,
          `📧 <b>Email:</b> ${customer.email}`,
          ``,
          `${metodoPago}`,
          customer.payRef ? `🔖 <b>Referencia:</b> ${customer.payRef}` : '',
          ``,
          `📦 <b>Artículos:</b>`,
          itemsText,
          ``,
          `💰 <b>Total: $${parseFloat(total).toFixed(2)}</b>`,
          ``,
          entregaText,
        ].filter(Boolean).join('\n');

        await sendTelegramNotification(
          customer.payCaptureBase64,
          customer.payCaptureName || 'comprobante.jpg',
          caption
        );
      } catch (tgErr) {
        console.error('Error al enviar notificación a Telegram:', tgErr);
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
