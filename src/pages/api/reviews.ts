import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { product_id, reviewer_name, rating, comment } = body;

    if (!product_id || !reviewer_name || !rating) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400 });
    }

    const { data, error } = await supabase
      .from('product_reviews')
      .insert([
        { 
          product_id, 
          reviewer_name, 
          rating: parseInt(rating), 
          comment 
        }
      ])
      .select()
      .single();

    if (error) {
      // Si la tabla no existe, informamos al usuario (esto es útil para el primer despliegue)
      if (error.code === '42P01') {
        return new Response(JSON.stringify({ error: 'La tabla de reseñas no ha sido creada en la base de datos.' }), { status: 500 });
      }
      throw error;
    }

    return new Response(JSON.stringify({ success: true, review: data }), { status: 200 });
  } catch (error: any) {
    console.error('Error submitting review:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
