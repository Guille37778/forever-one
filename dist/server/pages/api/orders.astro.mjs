import { a as supabaseAdmin } from '../../chunks/supabase_FqJk9_vE.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const { customer, items, total, courier } = await request.json();
    if (!customer || !items || items.length === 0) {
      return new Response(JSON.stringify({ error: "Faltan datos de la orden" }), { status: 400 });
    }
    const finalCourier = (courier || "otro").toLowerCase();
    const { data: order, error: orderError } = await supabaseAdmin.from("orders").insert({
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      city: customer.city || "Desconocida",
      courier: finalCourier,
      total_usd: parseFloat(total) || 0,
      payment_reference: customer.paymentReference,
      status: "verificando"
    }).select().single();
    if (orderError) {
      console.error("Error insertando orden en Supabase:", orderError);
      throw new Error(`Error en base de datos: ${orderError.message}`);
    }
    for (const item of items) {
      const { error: itemError } = await supabaseAdmin.from("order_items").insert({
        order_id: order.id,
        product_id: item.productId,
        variant_id: item.variantId,
        product_name: item.name,
        size: item.size,
        price_usd: parseFloat(item.price) || 0,
        quantity: parseInt(item.qty) || 1
      });
      if (itemError) {
        console.error("Error insertando item de orden:", itemError);
        throw new Error(`Error en items de orden: ${itemError.message}`);
      }
      if (item.variantId) {
        const { data: currentVariant, error: variantFetchError } = await supabaseAdmin.from("variants").select("stock_quantity").eq("id", item.variantId).single();
        if (variantFetchError) {
          console.warn("No se pudo obtener stock para actualizar:", variantFetchError);
        } else if (currentVariant) {
          const { error: stockUpdateError } = await supabaseAdmin.from("variants").update({ stock_quantity: Math.max(0, currentVariant.stock_quantity - item.qty) }).eq("id", item.variantId);
          if (stockUpdateError) {
            console.error("Error actualizando stock:", stockUpdateError);
          }
        }
      }
    }
    return new Response(JSON.stringify({
      success: true,
      orderCode: order.order_code,
      orderId: order.id
    }), { status: 200 });
  } catch (e) {
    console.error("Error fatal creando orden:", e);
    return new Response(JSON.stringify({ error: e.message || "Error interno del servidor" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
