import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Goals, Profile, Recommendation } from '../../shared/schemas.ts'
import { AppContext, emptyGoals } from './appContext.ts'

const STORAGE_KEY = 'mike.onboarding.v1'

type Persisted = {
  profile: Profile | null
  goals: Goals
  recommendations: Recommendation[] | null
}

/* Reading and writing are both wrapped: storage throws in private windows and
   when site data is blocked, and a half-written value should not take the app
   down on next load. */
function load(): Persisted {
  const fallback: Persisted = {
    profile: null,
    goals: emptyGoals,
    recommendations: null,
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as Partial<Persisted>
    return {
      profile: parsed.profile ?? null,
      goals: { ...emptyGoals, ...(parsed.goals ?? {}) },
      recommendations: parsed.recommendations ?? null,
    }
  } catch {
    return fallback
  }
}

/* Holds what the person has told us so far. The resume step writes the
   profile, the goals wizard writes the goals, and the learning path reads
   both to ask for recommendations, so this is what makes the AI steps feed
   each other rather than each starting from nothing. */
export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* Not fatal: the session still works, it just will not survive a
         reload. */
    }
  }, [state])

  const setProfile = useCallback((profile: Profile | null) => {
    setState((prev) => ({ ...prev, profile }))
  }, [])

  const setGoals = useCallback((goals: Partial<Goals>) => {
    setState((prev) => ({ ...prev, goals: { ...prev.goals, ...goals } }))
  }, [])

  const setRecommendations = useCallback(
    (recommendations: Recommendation[] | null) => {
      setState((prev) => ({ ...prev, recommendations }))
    },
    [],
  )

  const reset = useCallback(() => {
    setState({ profile: null, goals: emptyGoals, recommendations: null })
  }, [])

  const value = useMemo(
    () => ({ ...state, setProfile, setGoals, setRecommendations, reset }),
    [state, setProfile, setGoals, setRecommendations, reset],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
