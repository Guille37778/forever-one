export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  console.log("[API-TEST] POST recibido");
  const body = await request.text();
  console.log("[API-TEST] Body:", body);
  return new Response(JSON.stringify({ success: true, body }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
