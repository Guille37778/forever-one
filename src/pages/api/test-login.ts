export const POST = async ({ request }: any) => {
  console.log('[API-TEST] POST recibido');
  const body = await request.text();
  console.log('[API-TEST] Body:', body);
  return new Response(JSON.stringify({ success: true, body }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
export const prerender = false;
