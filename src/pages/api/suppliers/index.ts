import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';

// GET /api/suppliers — Listar proveedores con filtros
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const tag = url.searchParams.get('tag') || '';
    const active = url.searchParams.get('active'); // 'true', 'false', or null (all)
    const confidential = url.searchParams.get('confidential'); // filter confidential
    const sortBy = url.searchParams.get('sort') || 'created_at';
    const sortDir = url.searchParams.get('dir') === 'asc' ? true : false;

    let query = supabaseAdmin.from('suppliers').select('*');

    // Filtro de búsqueda por nombre, contacto o email
    if (search) {
      query = query.or(`company_name.ilike.%${search}%,contact_person.ilike.%${search}%,email.ilike.%${search}%`);
    }

    // Filtro por etiqueta
    if (tag) {
      query = query.contains('tags', [tag]);
    }

    // Filtro por estado activo
    if (active === 'true') query = query.eq('is_active', true);
    if (active === 'false') query = query.eq('is_active', false);

    // Filtro de confidencialidad
    if (confidential === 'true') query = query.eq('is_confidential', true);
    if (confidential === 'false') query = query.eq('is_confidential', false);

    // Ordenamiento
    query = query.order(sortBy, { ascending: sortDir });

    const { data, error } = await query;

    if (error) throw error;

    return new Response(JSON.stringify({ suppliers: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST /api/suppliers — Crear proveedor
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from('suppliers')
      .insert({
        company_name: body.company_name,
        contact_person: body.contact_person || null,
        email: body.email || null,
        phone: body.phone || null,
        phone_secondary: body.phone_secondary || null,
        city: body.city || null,
        address: body.address || null,
        website: body.website || null,
        notes: body.notes || null,
        payment_terms: body.payment_terms || null,
        tags: body.tags || [],
        is_active: body.is_active !== undefined ? body.is_active : true,
        is_confidential: body.is_confidential || false,
        next_restock_date: body.next_restock_date || null,
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ supplier: data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
