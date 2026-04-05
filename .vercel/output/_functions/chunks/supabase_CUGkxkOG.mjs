import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://uvsbugnqskfiteqwdupp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c2J1Z25xc2tmaXRlcXdkdXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTcyNTQsImV4cCI6MjA5MDc3MzI1NH0.lBZp9vu91zj8J6K28FKamSpL5MXpYYf7WT5H-E2E0FM";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = supabase;

export { supabaseAdmin as a, supabase as s };
