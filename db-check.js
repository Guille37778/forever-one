import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env manually
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
});

const supabaseUrl = env['PUBLIC_SUPABASE_URL'] || env['SUPABASE_URL'];
const supabaseKey = env['PUBLIC_SUPABASE_ANON_KEY'] || env['SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log('Querying Supabase at:', supabaseUrl);
    const { data, error } = await supabase.from('products').select('id, name, is_active').eq('is_active', true).limit(10);
    if (error) {
        console.error('Error fetching products:', error);
    } else {
        console.log('Success! Sample products:', data);
    }
}
main();
