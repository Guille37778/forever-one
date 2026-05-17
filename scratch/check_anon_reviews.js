import { createClient } from '@supabase/supabase-js';

const URL = 'https://uvsbugnqskfiteqwdupp.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c2J1Z25xc2tmaXRlcXdkdXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTcyNTQsImV4cCI6MjA5MDc3MzI1NH0.lBZp9vu91zj8J6K28FKamSpL5MXpYYf7WT5H-E2E0FM';

const supabase = createClient(URL, KEY);

async function check() {
    console.log('--- AUDITORÍA DE RESEÑAS CON CLAVE ANON ---');
    
    // 1. Intentar leer reseñas con clave anon
    const { data: reviews, error: rError } = await supabase.from('product_reviews').select('*').limit(5);
    if (rError) {
        console.error('Error al consultar product_reviews con anon:', rError);
    } else {
        console.log('Reseñas encontradas con anon:', reviews);
    }

    // 2. Intentar crear una reseña de prueba para un producto activo con clave anon
    const { data: product } = await supabase.from('products').select('id').limit(1).single();
    if (product) {
        console.log('Producto para prueba:', product.id);
        const { data: inserted, error: iError } = await supabase.from('product_reviews').insert([{
            product_id: product.id,
            reviewer_name: 'Anon Test Reviewer',
            rating: 5,
            comment: 'Excelente producto de prueba anon!'
        }]).select();
        
        if (iError) {
            console.error('Error al insertar reseña con anon:', iError);
        } else {
            console.log('Reseña insertada con éxito con anon:', inserted);
        }
    } else {
        console.log('No hay productos para probar');
    }
}

check();
