import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // 1. Verificar sesión de administrador
    const accessToken = cookies.get('sb-access-token')?.value;
    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Sesión inválida' }), { status: 401 });
    }

    // 2. Obtener datos del cuerpo de la petición
    const body = await request.json();
    const errors: any[] = [];

    // 3. Guardar solo los campos que fueron enviados
    if (body.enabled !== undefined && body.enabled !== null) {
      const { error } = await supabaseAdmin
        .from('site_settings')
        .upsert({ key: 'delivery_enabled', value: body.enabled.toString() }, { onConflict: 'key' });
      if (error) errors.push(error);
    }

    if (body.zones !== undefined && body.zones !== null) {
      const { error } = await supabaseAdmin
        .from('site_settings')
        .upsert({ key: 'delivery_zones', value: body.zones }, { onConflict: 'key' });
      if (error) errors.push(error);
    }

    if (body.zelleRate !== undefined && body.zelleRate !== null) {
      const { error } = await supabaseAdmin
        .from('site_settings')
        .upsert({ key: 'zelle_rate', value: body.zelleRate.toString() }, { onConflict: 'key' });
      if (error) errors.push(error);
    }

    if (errors.length > 0) {
      console.error('Error de Supabase:', errors[0]);
      throw new Error(errors[0].message || 'Error al guardar en la base de datos');
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error en API update-settings:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
