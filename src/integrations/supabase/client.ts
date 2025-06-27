import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Using Vite's import.meta.env to access environment variables in browser
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set and provide developer feedback
if (!SUPABASE_URL || SUPABASE_URL === 'your_supabase_url_here' || !SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'your_supabase_anon_key_here') {
  console.error(
    "⚠️ Invalid Supabase configuration detected ⚠️\n" +
    "Missing or placeholder Supabase environment variables. Make sure you've set up your .env file correctly:\n" +
    "- VITE_SUPABASE_URL: " + (SUPABASE_URL && SUPABASE_URL !== 'your_supabase_url_here' ? "✓" : "✗") + "\n" +
    "- VITE_SUPABASE_ANON_KEY: " + (SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== 'your_supabase_anon_key_here' ? "✓" : "✗") + "\n\n" +
    "The application will use a fallback configuration, but some features may not work correctly."
  );
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// Fallback values for development - these won't work for real data operations
// but will prevent the application from crashing during development
const defaultUrl = 'https://placeholder-project.supabase.co';
const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjIzMjQ2OTgxLCJleHAiOjE5Mzg4MjI5ODF9.Example_Placeholder_Key';

// Function to check if a URL is valid
const isValidUrl = (url: string): boolean => {
  if (!url || url === 'your_supabase_url_here') {
    return false;
  }
  
  try {
    new URL(url);
    return true;
  } catch (e) {
    console.error(`Invalid Supabase URL format: ${url}`);
    return false;
  }
};

// Use valid URL and key values or fallbacks
const validUrl = isValidUrl(SUPABASE_URL) ? SUPABASE_URL : defaultUrl;
const validKey = (SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== 'your_supabase_anon_key_here') ? SUPABASE_ANON_KEY : defaultKey;

let supabaseClient;

try {
  // Attempt to create the Supabase client
  supabaseClient = createClient<Database>(validUrl, validKey);
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  // Provide a mock client that won't cause runtime errors
  supabaseClient = {
    auth: { signIn: () => Promise.reject('Supabase not configured') },
    from: () => ({ select: () => Promise.reject('Supabase not configured') }),
    storage: { from: () => ({ upload: () => Promise.reject('Supabase not configured') }) },
    functions: { invoke: () => Promise.reject('Supabase not configured') }
  } as any;
}

export const supabase = supabaseClient;