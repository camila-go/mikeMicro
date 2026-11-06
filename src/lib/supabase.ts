import { createClient } from '@supabase/supabase-js'

/* The publishable key is meant to be in the browser: it only permits what
   row level security allows. The service role key must never appear here.
   Anything secret stays in the functions under api/. */
const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const isSupabaseConfigured = Boolean(url && publishableKey)

/* Null until the project is configured, so the app can still run and say so
   rather than throwing on import. */
export const supabase = isSupabaseConfigured
  ? createClient(url, publishableKey, {
      auth: {
        /* The OAuth redirect comes back with the session in the URL; this
           picks it up and then cleans the address bar. */
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
        flowType: 'pkce',
      },
    })
  : null
