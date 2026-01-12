import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables. Please check your .env file.');
    console.error('Required variables: PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY');
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
    auth: {
        persistSession: false // Disable session persistence for now
    }
});

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
    return !!(supabaseUrl && supabaseAnonKey &&
        supabaseUrl !== 'your-project-url.supabase.co' &&
        supabaseAnonKey !== 'your-anon-key-here');
};
