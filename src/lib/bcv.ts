import { supabase } from './supabase';

/**
 * Fetches the official BCV USD rate from reliable third-party APIs
 * that mirror the Banco Central de Venezuela's published rate.
 * Uses dolarapi.com as primary and pydolarve.org as fallback.
 * @returns {Promise<number>} The exact BCV rate, no markup applied.
 */
export async function getBcvRate(): Promise<number> {
  // --- Primary: ve.dolarapi.com ---
  try {
    const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) throw new Error(`dolarapi HTTP error: ${response.status}`);

    const data = await response.json() as { promedio?: number; venta?: number };
    // El BCV publica una única tasa de referencia → campo 'promedio'
    const rate = data.promedio ?? data.venta;

    if (!rate || isNaN(rate)) throw new Error('dolarapi: invalid rate value');

    console.log('[BCV Rate] Fetched from dolarapi.com:', rate);
    return rate;
  } catch (primaryError) {
    console.warn('[BCV Primary API failed]:', primaryError);
  }

  // --- Fallback: pydolarve.org ---
  try {
    const response = await fetch('https://pydolarve.org/api/v1/dollar?monitor=bcv', {
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) throw new Error(`pydolarve HTTP error: ${response.status}`);

    const data = await response.json() as { price?: number; data?: { price?: number } };
    const rate = data.price ?? data.data?.price;

    if (!rate || isNaN(rate)) throw new Error('pydolarve: invalid rate value');

    console.log('[BCV Rate] Fetched from pydolarve.org:', rate);
    return rate;
  } catch (fallbackError) {
    console.error('[BCV Fallback API failed]:', fallbackError);
    throw new Error('No se pudo obtener la tasa BCV. Ambas fuentes fallaron.');
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
