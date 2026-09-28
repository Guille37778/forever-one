import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';

// GET /api/suppliers/:id — Obtener un proveedor con sus datos relacionados
export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    // Obtener proveedor
    const { data: supplier, error } = await supabaseAdmin
      .from('suppliers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!supplier) {
      return new Response(JSON.stringify({ error: 'Proveedor no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Obtener redes sociales
    const { data: socials } = await supabaseAdmin
      .from('supplier_social_profiles')
      .select('*')
      .eq('supplier_id', id);

    // Obtener compras (ordenadas por fecha desc)
    const { data: purchases } = await supabaseAdmin
      .from('supplier_purchases')
      .select('*')
      .eq('supplier_id', id)
      .order('purchase_date', { ascending: false });

    // Obtener documentos
    const { data: documents } = await supabaseAdmin
      .from('supplier_documents')
      .select('*')
      .eq('supplier_id', id)
      .order('uploaded_at', { ascending: false });

    return new Response(JSON.stringify({
      supplier,
      socials: socials || [],
      purchases: purchases || [],
      documents: documents || [],
    }), {
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

// PUT /api/suppliers/:id — Actualizar proveedor
export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from('suppliers')
      .update({
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
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ supplier: data }), {
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

// DELETE /api/suppliers/:id — Eliminar proveedor
export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    const { error } = await supabaseAdmin
      .from('suppliers')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
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
