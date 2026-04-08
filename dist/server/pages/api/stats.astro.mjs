import { a as supabaseAdmin } from '../../chunks/supabase_FqJk9_vE.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const { productId, incrementViews, timeSpent, whatsappClick } = await request.json();
    if (!productId) {
      return new Response(JSON.stringify({ error: "Missing productId" }), { status: 400 });
    }
    let updateData = {};
    if (incrementViews) {
      const { data: current } = await supabaseAdmin.from("product_stats").select("views").eq("product_id", productId).maybeSingle();
      updateData.views = (current?.views || 0) + 1;
    }
    if (timeSpent) {
      const { data: current } = await supabaseAdmin.from("product_stats").select("avg_time_on_page_seconds").eq("product_id", productId).maybeSingle();
      updateData.avg_time_on_page_seconds = (current?.avg_time_on_page_seconds || 0) + timeSpent;
    }
    if (whatsappClick) {
      const { data: current } = await supabaseAdmin.from("product_stats").select("whatsapp_clicks").eq("product_id", productId).maybeSingle();
      updateData.whatsapp_clicks = (current?.whatsapp_clicks || 0) + 1;
    }
    const { data: existing, error: fetchError } = await supabaseAdmin.from("product_stats").select("id").eq("product_id", productId).maybeSingle();
    if (fetchError) {
      console.error("Error fetching stats:", fetchError);
      throw fetchError;
    }
    let saveError;
    if (existing) {
      const { error } = await supabaseAdmin.from("product_stats").update({
        ...updateData,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
        // Actualizamos fecha de última actividad
      }).eq("id", existing.id);
      saveError = error;
    } else {
      const { error } = await supabaseAdmin.from("product_stats").insert({
        product_id: productId,
        ...updateData,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      });
      saveError = error;
    }
    if (saveError) {
      console.error("Error saving stats:", saveError);
      throw saveError;
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    console.error("Fatal stats error:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
