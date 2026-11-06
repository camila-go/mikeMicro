import { createContext, useContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

export type AuthState = {
  /* null while the initial session lookup is in flight, so screens can wait
     rather than flashing the signed-out state at someone who is signed in. */
  loading: boolean
  session: Session | null
  user: User | null
  /* False when the Supabase project has not been configured yet. The sign-in
     screen uses this to explain why rather than failing silently. */
  configured: boolean
  signInWithLinkedIn: () => Promise<void>
  signInWithPassword: (email: string, password: string) => Promise<void>
  signUpWithPassword: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthState | null>(null)

export function useAuth(): AuthState {
  const state = useContext(AuthContext)
  if (!state) throw new Error('useAuth must be used inside AuthProvider')
  return state
}

/* LinkedIn gives a standard app only `openid profile email`, which is
   identity: name, picture, locale, email. Work history, skills and education
   are behind LinkedIn's partner programmes and are not available here, so
   the resume step is what fills those in. */
export const LINKEDIN_PROVIDER = 'linkedin_oidc' as const
