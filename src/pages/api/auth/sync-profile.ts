import type { APIRoute } from 'astro';
import { supabase, supabaseAdmin } from '../../../lib/supabase';

// POST /api/auth/sync-profile
// Called from the client after Google login to ensure the profile exists in the DB.
// Uses the service role key to bypass RLS safely.
export const POST: APIRoute = async ({ request }) => {
    try {
        // Get the auth token from the request header
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');

        // Verify the token and get the user
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 401 });
        }

        // Extract name from Google metadata
        const meta = user.user_metadata || {};
        const fullName = meta.full_name || meta.name || user.email?.split('@')[0] || 'Cliente';

        // Upsert the profile using admin client (bypasses RLS)
        const { data: profile, error: upsertError } = await supabaseAdmin
            .from('profiles')
            .upsert({
                id: user.id,
                full_name: fullName,
                email: user.email,
                city: meta.city || 'Desconocida'
            }, { onConflict: 'id' })
            .select()
            .single();

        if (upsertError) {
            console.error('[sync-profile] Upsert error:', upsertError);
            return new Response(JSON.stringify({ error: upsertError.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true, profile }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (e: any) {
        console.error('[sync-profile] Error:', e);
        return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
    }
};
