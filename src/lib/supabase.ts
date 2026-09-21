import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
// For security and best practices, we use environment variables.
// The user can provide these in a .env.local file.
// NEXT_PUBLIC_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://evbjvcvfeoivbnqkvaqz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY_HERE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
