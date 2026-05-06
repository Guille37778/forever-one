
import { createClient } from '@supabase/supabase-js';

const URL = 'https://uvsbugnqskfiteqwdupp.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c2J1Z25xc2tmaXRlcXdkdXBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE5NzI1NCwiZXhwIjoyMDkwNzczMjU0fQ.RffXXfCtpBT5W6P6TJ6H6Wo_lhr1iSF254hyhaqYmEo';

const supabase = createClient(URL, KEY);

async function migrate() {
    console.log('--- INICIANDO RESCATE DE IDENTIDADES ---');
    
    // 1. Obtener todos los usuarios de Auth
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
        console.error('Error al obtener usuarios de Auth:', authError.message);
        return;
    }

    console.log(`Se encontraron ${users.length} usuarios en el sistema de autenticación.`);

    for (const user of users) {
        console.log(`Sincronizando: ${user.email}...`);
        
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0];
        
        const { error: upsertError } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                email: user.email,
                full_name: fullName,
                created_at: user.created_at
            }, { onConflict: 'id' });

        if (upsertError) {
            console.error(`Fallo al sincronizar ${user.email}:`, upsertError.message);
        } else {
            console.log(`✅ ${user.email} sincronizado correctamente.`);
        }
    }

    console.log('\n--- RESCATE COMPLETADO ---');
}

migrate();
