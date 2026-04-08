import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://uvsbugnqskfiteqwdupp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c2J1Z25xc2tmaXRlcXdkdXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTcyNTQsImV4cCI6MjA5MDc3MzI1NH0.lBZp9vu91zj8J6K28FKamSpL5MXpYYf7WT5H-E2E0FM";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c2J1Z25xc2tmaXRlcXdkdXBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE5NzI1NCwiZXhwIjoyMDkwNzczMjU0fQ.RffXXfCtpBT5W6P6TJ6H6Wo_lhr1iSF254hyhaqYmEo";
const supabase = createClient(supabaseUrl, supabaseAnonKey) ;
if (!supabase) {
  console.warn("⚠️ Supabase client (standard) could not be initialized. Check your environment variables.");
}
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey) ;
if (!supabaseAdmin) {
  console.warn("⚠️ Supabase Admin client could not be initialized. Check your environment variables.");
}

export { supabaseAdmin as a, supabase as s };
