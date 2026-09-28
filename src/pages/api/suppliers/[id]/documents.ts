import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../../lib/supabase';

// GET /api/suppliers/:id/documents — Listar documentos de un proveedor
export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    const { data, error } = await supabaseAdmin
      .from('supplier_documents')
      .select('*')
      .eq('supplier_id', id)
      .order('uploaded_at', { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify({ documents: data || [] }), {
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

// POST /api/suppliers/:id/documents — Registrar documento
export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from('supplier_documents')
      .insert({
        supplier_id: id,
        name: body.name,
        file_url: body.file_url,
        file_type: body.file_type || null,
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ document: data }), {
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

// DELETE /api/suppliers/:id/documents — Eliminar documento
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const documentId = url.searchParams.get('documentId');

    if (!documentId) {
      return new Response(JSON.stringify({ error: 'documentId requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { error } = await supabaseAdmin
      .from('supplier_documents')
      .delete()
      .eq('id', documentId);

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
