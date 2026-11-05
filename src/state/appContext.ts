import { createContext, useContext } from 'react'
import type { Goals, Profile, Recommendation } from '../../shared/schemas.ts'

export type AppState = {
  profile: Profile | null
  goals: Goals
  recommendations: Recommendation[] | null
  setProfile: (profile: Profile | null) => void
  setGoals: (goals: Partial<Goals>) => void
  setRecommendations: (recommendations: Recommendation[] | null) => void
  reset: () => void
}

export const emptyGoals: Goals = { intent: '', timeline: '', note: '' }

export const AppContext = createContext<AppState | null>(null)

export function useAppState(): AppState {
  const state = useContext(AppContext)
  if (!state) {
    throw new Error('useAppState must be used inside AppStateProvider')
  }
  return state
}
