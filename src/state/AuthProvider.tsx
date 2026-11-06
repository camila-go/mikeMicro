import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { AuthContext, LINKEDIN_PROVIDER } from './authContext'

function requireClient() {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local.',
    )
  }
  return supabase
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!supabase) return

    let active = true

    /* Covers a reload with a stored session, and the moment the OAuth
       redirect lands back on the app. */
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setLoading(false)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, next) => {
        setSession(next)
        setLoading(false)
      },
    )

    return () => {
      active = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  const signInWithLinkedIn = useCallback(async () => {
    const { error } = await requireClient().auth.signInWithOAuth({
      provider: LINKEDIN_PROVIDER,
      options: {
        /* Comes back to wherever the app is running, which is why localhost
           has to be on the project's redirect allow list. LinkedIn itself
           only ever sees the Supabase HTTPS callback. */
        redirectTo: `${window.location.origin}/resume`,
      },
    })
    if (error) throw new Error(error.message)
  }, [])

  const signInWithPassword = useCallback(
    async (email: string, password: string) => {
      const { error } = await requireClient().auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw new Error(error.message)
    },
    [],
  )

  const signUpWithPassword = useCallback(
    async (email: string, password: string, fullName: string) => {
      const { error } = await requireClient().auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      })
      if (error) throw new Error(error.message)
    },
    [],
  )

  const signOut = useCallback(async () => {
    const { error } = await requireClient().auth.signOut()
    if (error) throw new Error(error.message)
  }, [])

  const value = useMemo(
    () => ({
      loading,
      session,
      user: session?.user ?? null,
      configured: isSupabaseConfigured,
      signInWithLinkedIn,
      signInWithPassword,
      signUpWithPassword,
      signOut,
    }),
    [
      loading,
      session,
      signInWithLinkedIn,
      signInWithPassword,
      signUpWithPassword,
      signOut,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
