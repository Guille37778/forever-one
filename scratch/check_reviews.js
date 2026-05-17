import { createClient } from '@supabase/supabase-js';

const URL = 'https://uvsbugnqskfiteqwdupp.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c2J1Z25xc2tmaXRlcXdkdXBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE5NzI1NCwiZXhwIjoyMDkwNzczMjU0fQ.RffXXfCtpBT5W6P6TJ6H6Wo_lhr1iSF254hyhaqYmEo';

const supabase = createClient(URL, KEY);

async function check() {
    console.log('--- AUDITORÍA DE RESEÑAS ---');
    
    // 1. Intentar leer reseñas
    const { data: reviews, error: rError } = await supabase.from('product_reviews').select('*').limit(10);
    if (rError) {
        console.error('Error al consultar product_reviews:', rError);
    } else {
        console.log('Reseñas encontradas:', reviews);
    }

    // 2. Intentar crear una reseña de prueba para un producto activo
    const { data: product } = await supabase.from('products').select('id').limit(1).single();
    if (product) {
        console.log('Producto para prueba:', product.id);
        const { data: inserted, error: iError } = await supabase.from('product_reviews').insert([{
            product_id: product.id,
            reviewer_name: 'Test Reviewer',
            rating: 5,
            comment: 'Excelente producto de prueba!'
        }]).select();
        
        if (iError) {
            console.error('Error al insertar reseña:', iError);
        } else {
            console.log('Reseña insertada con éxito:', inserted);
            
            // Eliminar la reseña de prueba
            const { error: dError } = await supabase.from('product_reviews').delete().eq('id', inserted[0].id);
            console.log('Reseña de prueba eliminada:', dError ? dError : 'OK');
        }
    } else {
        console.log('No hay productos para probar');
    }
}

check();
