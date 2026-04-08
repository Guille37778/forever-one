import { a as supabaseAdmin } from '../../../chunks/supabase_FqJk9_vE.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const accessToken = cookies.get("sb-access-token")?.value;
    if (!accessToken) {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
    }
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Sesión inválida" }), { status: 401 });
    }
    const { error: resetStatsError } = await supabaseAdmin.from("product_stats").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    const { error: resetItemsError } = await supabaseAdmin.from("order_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    const { error: resetOrdersError } = await supabaseAdmin.from("orders").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (resetStatsError || resetItemsError || resetOrdersError) {
      console.error("Error reseteando analíticas u órdenes:", resetStatsError || resetItemsError || resetOrdersError);
      return new Response(JSON.stringify({ error: "Error al limpiar base de datos" }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true, message: "Analíticas reiniciadas correctamente" }), { status: 200 });
  } catch (e) {
    console.error("Error fatal en reset stats:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
