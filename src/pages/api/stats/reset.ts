import type { APIRoute } from 'astro';
import { supabaseAdmin as supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request: _, cookies }) => {
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
    const { error: resetStatsError } = await supabase
      .from('product_stats')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    // 3. Eliminar items de órdenes y órdenes para restablecer ventas
    const { error: resetItemsError } = await supabase
      .from('order_items')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    const { error: resetOrdersError } = await supabase
      .from('orders')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (resetStatsError || resetItemsError || resetOrdersError) {
      console.error('Error reseteando analíticas u órdenes:', resetStatsError || resetItemsError || resetOrdersError);
      return new Response(JSON.stringify({ error: 'Error al limpiar base de datos' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, message: 'Analíticas reiniciadas correctamente' }), { status: 200 });

  } catch (e: any) {
    console.error('Error fatal en reset stats:', e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
