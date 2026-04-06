import type { APIRoute } from 'astro';
import { supabaseAdmin as supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // 1. Verificar sesión de administrador (seguridad básica)
    const accessToken = cookies.get('sb-access-token')?.value;
    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Sesión inválida' }), { status: 401 });
    }

    // 2. Realizar el reset de las estadísticas
    // Eliminamos todos los registros de la tabla product_stats
    // Usamos el filtro 'neq' para asegurar que el comando se ejecute (algunos clientes requieren un filtro para DELETE)
    const { error: resetError } = await supabase
      .from('product_stats')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (resetError) {
      console.error('Error reseteando analíticas:', resetError);
      return new Response(JSON.stringify({ error: resetError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, message: 'Analíticas reiniciadas correctamente' }), { status: 200 });

  } catch (e: any) {
    console.error('Error fatal en reset stats:', e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
