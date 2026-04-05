import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // 1. Verificar sesión de administrador
    const accessToken = cookies.get('sb-access-token')?.value;
    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
    }

    const { data: { user }, error: authError } = await await supabaseAdmin.auth.getUser(accessToken);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Sesión inválida' }), { status: 401 });
    }

    // 2. Obtener datos del cuerpo de la petición
    const { enabled, zones } = await request.json();

    // 3. Guardar en site_settings usando el cliente Admin (salta RLS)
    const { error: err1 } = await supabaseAdmin
      .from('site_settings')
      .upsert({ key: 'delivery_enabled', value: enabled.toString() }, { onConflict: 'key' });

    const { error: err2 } = await supabaseAdmin
      .from('site_settings')
      .upsert({ key: 'delivery_zones', value: zones }, { onConflict: 'key' });

    if (err1 || err2) {
      console.error('Error de Supabase:', err1 || err2);
      throw new Error('Error al guardar en la base de datos');
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
