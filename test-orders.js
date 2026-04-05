import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Checking orders table...");
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .limit(5);
  
  if (error) {
    console.error("Error fetching orders:", error.message);
  } else {
    console.log("Orders found:", data.length);
    console.dir(data, { depth: null });
  }

  console.log("\nChecking RLS policies (if possible via RPC or raw query)...");
  // This might not work with anon key, but let's see if we can catch errors
}
run();
