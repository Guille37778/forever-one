import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
  .from('products')
  .select(`*, collections(name), subcategories(name, slug), variants(*)`)
  .eq('is_active', true);
  console.log("Error:", error);
  console.log("Data count:", data ? data.length : 0);
  console.dir(data?.[0], {depth: null});
  console.dir(data?.map(p => p.category));
}
run();
