import { supabaseAdmin } from './src/lib/supabase';

async function checkStock() {
    try {
        const { data, error } = await supabaseAdmin
            .from('products')
            .select('name, stock_quantity');

        if (error) {
            console.error('Error fetching stock:', error);
            process.exit(1);
        }

        console.log('--- DB STOCK DATA ---');
        data.forEach((p: any) => {
            console.log(`Product: ${p.name} | Stock: ${p.stock_quantity}`);
        });
    } catch (err) {
        console.error('Execution error:', err);
        process.exit(1);
    }
}

checkStock();
