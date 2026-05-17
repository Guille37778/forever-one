import { createClient } from '@supabase/supabase-js';

const URL = 'https://uvsbugnqskfiteqwdupp.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c2J1Z25xc2tmaXRlcXdkdXBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE5NzI1NCwiZXhwIjoyMDkwNzczMjU0fQ.RffXXfCtpBT5W6P6TJ6H6Wo_lhr1iSF254hyhaqYmEo';

const supabase = createClient(URL, KEY);

async function checkPolicies() {
    console.log('--- AUDITORÍA DE POLÍTICAS EN POSTGRES ---');
    
    // Consultar pg_policies
    const { data, error } = await supabase.rpc('execute_sql', {
        sql_query: "SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check FROM pg_policies WHERE tablename = 'product_reviews';"
    });
    
    if (error) {
        // Si la función RPC no existe, podemos intentar a través de otra consulta o simplemente ver qué pasa
        console.error('Error al ejecutar RPC:', error);
        
        // Intentemos otra consulta simple
        const { data: testData, error: testError } = await supabase.from('product_reviews').select('count', { count: 'exact', head: true });
        console.log('product_reviews count check:', testData, testError);
    } else {
        console.log('Políticas de product_reviews:', data);
    }
}

checkPolicies();
