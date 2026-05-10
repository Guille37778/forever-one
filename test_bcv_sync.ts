import { syncBcvRate } from './src/lib/bcv';

async function test() {
  try {
    console.log('🔄 Sincronizando tasa BCV...');
    const rate = await syncBcvRate();
    console.log('✅ Tasa sincronizada con éxito:', rate);
  } catch (e) {
    console.error('❌ Error al sincronizar:', e);
  }
}

test();
