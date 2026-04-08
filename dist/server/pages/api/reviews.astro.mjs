import { s as supabase } from '../../chunks/supabase_FqJk9_vE.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { product_id, reviewer_name, rating, comment } = body;
    if (!product_id || !reviewer_name || !rating) {
      return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), { status: 400 });
    }
    const { data, error } = await supabase.from("product_reviews").insert([
      {
        product_id,
        reviewer_name,
        rating: parseInt(rating),
        comment
      }
    ]).select().single();
    if (error) {
      if (error.code === "42P01") {
        return new Response(JSON.stringify({ error: "La tabla de reseñas no ha sido creada en la base de datos." }), { status: 500 });
      }
      throw error;
    }
    return new Response(JSON.stringify({ success: true, review: data }), { status: 200 });
  } catch (error) {
    console.error("Error submitting review:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
