import { createClient } from '@supabase/supabase-js';

const URL = 'https://uvsbugnqskfiteqwdupp.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c2J1Z25xc2tmaXRlcXdkdXBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE5NzI1NCwiZXhwIjoyMDkwNzczMjU0fQ.RffXXfCtpBT5W6P6TJ6H6Wo_lhr1iSF254hyhaqYmEo';
const supabase = createClient(URL, KEY);

async function testDelete() {
    const { data: product } = await supabase.from('products').select('id').limit(1).single();
    if (!product) {
        console.log('No products found');
        return;
    }

    const { data: inserted, error: iError } = await supabase.from('product_reviews').insert([{
        product_id: product.id,
        reviewer_name: 'Test Delete Client',
        rating: 5,
        comment: 'Esta reseña se borrará mediante el endpoint local'
    }]).select().single();

    if (iError || !inserted) {
        console.error('Error al insertar reseña:', iError);
        return;
    }

    const reviewId = inserted.id;
    console.log('Reseña insertada con ID:', reviewId);

    // 2. Intentar llamar al endpoint DELETE local
    console.log(`Llamando a DELETE http://localhost:4321/api/reviews/${reviewId}`);
    try {
        const response = await fetch(`http://localhost:4321/api/reviews/${reviewId}`, {
            method: 'DELETE'
        });
        
        const text = await response.text();
        console.log('Status code:', response.status);
        console.log('Respuesta:', text);
    } catch (e) {
        console.error('Error en fetch:', e);
    }
}

testDelete();
