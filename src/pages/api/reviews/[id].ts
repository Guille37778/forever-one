import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';

/**
 * Handle Admin Review Operations
 * PATCH /api/reviews/[id] - Update a review
 * DELETE /api/reviews/[id] - Delete a review
 * Uses supabaseAdmin to bypass RLS since these are admin-only actions.
 */
export const PATCH: APIRoute = async ({ request, params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID de reseña requerido' }), { status: 400 });
    }

    const { reviewer_name, rating, comment } = await request.json();

    if (!reviewer_name || rating === undefined) {
      return new Response(JSON.stringify({ error: 'Nombre de reseñador y calificación requeridos' }), { status: 400 });
    }

    const parsedRating = typeof rating === 'number' ? rating : parseInt(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return new Response(JSON.stringify({ error: 'Calificación inválida (debe ser de 1 a 5)' }), { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('product_reviews')
      .update({
        reviewer_name,
        rating: parsedRating,
        comment
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, review: data }), { status: 200 });
  } catch (e: any) {
    console.error('[reviews/[id].ts] Error updating review:', e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID de reseña requerido' }), { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('product_reviews')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e: any) {
    console.error('[reviews/[id].ts] Error deleting review:', e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
