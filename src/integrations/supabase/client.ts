import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Using Vite's import.meta.env to access environment variables in browser
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set and provide developer feedback
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    "Missing Supabase environment variables. Make sure you've set up your .env file correctly:\n" +
    "- VITE_SUPABASE_URL: " + (SUPABASE_URL ? "✓" : "✗") + "\n" +
    "- VITE_SUPABASE_ANON_KEY: " + (SUPABASE_ANON_KEY ? "✓" : "✗")
  );
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL || '', 
  SUPABASE_ANON_KEY || ''
);