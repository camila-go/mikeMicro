import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../state/authContext'
import { Screen } from './Screen'

/* Everything past sign-in is per-person, so it waits for the session lookup
   and sends anyone signed out back to sign in.

   While Supabase is unconfigured the guard stays open, so the screens remain
   reachable for design review rather than locking the whole app behind an
   auth system that cannot run yet. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { loading, user, configured } = useAuth()
  const location = useLocation()

  if (!configured) return <>{children}</>

  if (loading) {
    return (
      <Screen variant="center">
        <p className="text-[14px] text-slate-200">Checking your session...</p>
      </Screen>
    )
  }

  if (!user) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}
