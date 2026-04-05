import { s as supabase } from './supabase_CUGkxkOG.mjs';

async function getBcvRate() {
  const BCV_URL = "https://www.bcv.org.ve/";
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const response = await fetch(BCV_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    const dolarMatch = html.match(/id=['"]dolar['"][^>]*>[\s\S]*?<strong>\s*([\d,.]+)\s*<\/strong>/i);
    if (!dolarMatch || !dolarMatch[1]) {
      throw new Error("Could not find USD rate in BCV HTML");
    }
    const rawRate = parseFloat(dolarMatch[1].replace(/\./g, "").replace(",", "."));
    if (isNaN(rawRate)) throw new Error("Parsed rate is NaN");
    const rateWithMargin = rawRate * 1.01;
    return rateWithMargin;
  } catch (error) {
    console.error("[BCV Scraper Error]:", error);
    throw error;
  }
}
async function syncBcvRate() {
  try {
    const newRate = await getBcvRate();
    const { error } = await supabase.from("site_settings").upsert({
      key: "bcv_usd_rate",
      value: newRate.toFixed(4),
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }, { onConflict: "key" });
    if (error) throw error;
    return newRate;
  } catch (error) {
    console.error("[Sync BCV Error]:", error);
    throw error;
  }
}

const GET = async ({ request }) => {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const API_SECRET = "fo1-secret-bcv-192837";
  if (secret !== API_SECRET) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const rate = await syncBcvRate();
    return new Response(JSON.stringify({
      success: true,
      rate: rate.toFixed(4),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
