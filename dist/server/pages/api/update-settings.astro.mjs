import { a as supabaseAdmin } from '../../chunks/supabase_FqJk9_vE.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const accessToken = cookies.get("sb-access-token")?.value;
    if (!accessToken) {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
    }
    const { data: { user }, error: authError } = await await supabaseAdmin.auth.getUser(accessToken);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Sesión inválida" }), { status: 401 });
    }
    const { enabled, zones } = await request.json();
    const { error: err1 } = await supabaseAdmin.from("site_settings").upsert({ key: "delivery_enabled", value: enabled.toString() }, { onConflict: "key" });
    const { error: err2 } = await supabaseAdmin.from("site_settings").upsert({ key: "delivery_zones", value: zones }, { onConflict: "key" });
    if (err1 || err2) {
      console.error("Error de Supabase:", err1 || err2);
      throw new Error("Error al guardar en la base de datos");
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error en API update-settings:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
