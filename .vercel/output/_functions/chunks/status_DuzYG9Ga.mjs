import { s as supabase } from './supabase_CUGkxkOG.mjs';

const POST = async ({ request, params }) => {
  try {
    const { id } = params;
    const { status, trackingNumber, notes } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "ID de orden requerido" }), { status: 400 });
    }
    const updateData = { updated_at: /* @__PURE__ */ new Date() };
    if (status) updateData.status = status;
    if (trackingNumber) updateData.tracking_number = trackingNumber;
    if (notes) updateData.notes = notes;
    const { error } = await supabase.from("orders").update(updateData).eq("id", id);
    if (error) throw error;
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
