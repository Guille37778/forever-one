
import { createClient } from '@supabase/supabase-js';

const URL = 'https://uvsbugnqskfiteqwdupp.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c2J1Z25xc2tmaXRlcXdkdXBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE5NzI1NCwiZXhwIjoyMDkwNzczMjU0fQ.RffXXfCtpBT5W6P6TJ6H6Wo_lhr1iSF254hyhaqYmEo';

const supabase = createClient(URL, KEY);

async function debug() {
    console.log('--- AUDITORÍA DE BASE DE DATOS ---');
    
    // 1. Ver perfiles
    const { data: profiles, error: pError } = await supabase.from('profiles').select('*').limit(10);
    console.log('\n[PROFILES] Registros:', profiles || pError);

    // 2. Ver órdenes (últimas 5)
    const { data: orders, error: oError } = await supabase.from('orders').select('id, customer_email, profile_id, created_at').order('created_at', { ascending: false }).limit(5);
    console.log('\n[ORDERS] Últimos pedidos:', orders || oError);

    // 3. Ver subcategorías con conteo de productos
    const { data: subcats } = await supabase.from('subcategories').select('id, name').limit(10);
    console.log('\n[SUBCATEGORIES]:', subcats);
}

debug();
