import { supabase } from './supabase';

/**
 * Scrapes the BCV website to get the USD exchange rate.
 * @returns {Promise<number>} The rate with a 1.01 multiplier (1% margin).
 */
export async function getBcvRate(): Promise<number> {
  const BCV_URL = 'https://www.bcv.org.ve/';
  
  try {
    // BCV has certificate issues frequently. We disable SSL verification for this specific fetch.
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    
    const response = await fetch(BCV_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    // Re-enable it immediately for other requests
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const html = await response.text();
    
    // Regex to find the dollar rate in the HTML structure: <div id="dolar"> ... <strong> 47,40598000 </strong>
    // Made more flexible with optional spaces and tags
    const dolarMatch = html.match(/id=['"]dolar['"][^>]*>[\s\S]*?<strong>\s*([\d,.]+)\s*<\/strong>/i);
    
    if (!dolarMatch || !dolarMatch[1]) {
      throw new Error('Could not find USD rate in BCV HTML');
    }

    // BCV uses comma for decimals
    const rawRate = parseFloat(dolarMatch[1].replace(/\./g, '').replace(',', '.'));
    
    if (isNaN(rawRate)) throw new Error('Parsed rate is NaN');

    // Apply 1% margin
    const rateWithMargin = rawRate * 1.01;
    
    return rateWithMargin;
  } catch (error) {
    console.error('[BCV Scraper Error]:', error);
    throw error;
  }
}

/**
 * Updates the exchange rate in the database.
 */
export async function syncBcvRate() {
  try {
    const newRate = await getBcvRate();
    
    const { error } = await supabase
      .from('site_settings')
      .upsert({ 
        key: 'bcv_usd_rate', 
        value: newRate.toFixed(4),
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (error) throw error;
    
    return newRate;
  } catch (error) {
    console.error('[Sync BCV Error]:', error);
    throw error;
  }
}

/**
 * Gets the current rate from the database.
 */
export async function getCurrentRate(): Promise<number> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'bcv_usd_rate')
    .single();

  if (error || !data) return 0;
  return parseFloat(data.value);
}
