import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { ComponentType } from 'react'
import { PendingScreen } from './components/PendingScreen'
import { RequireAuth } from './components/RequireAuth'
import { screens } from './data/screens'
import Goals from './screens/Goals'
import Index from './screens/Index'
import Join from './screens/Join'
import LearningPath from './screens/LearningPath'
import ProfileReview from './screens/ProfileReview'
import Resume from './screens/Resume'
import SignIn from './screens/SignIn'
import Splash from './screens/Splash'

/* Reachable without signing in: the brand screen and the two auth screens. 
   Everything else is per-person and sits behind RequireAuth. */
const PUBLIC_PATHS = new Set(['/splash', '/sign-in', '/join'])

/* Screens built from design context. Anything not listed here still renders
   a placeholder, so the route map stays complete while the screens land. */
const built: Record<string, ComponentType> = {
  '/splash': Splash,
  '/sign-in': SignIn,
  '/join': Join,
  '/goals': Goals,
  '/resume': Resume,
  '/profile-review': ProfileReview,
  '/learning-path': LearningPath,
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {screens.map((screen) => {
          const Built = built[screen.path]
          const element = Built ? (
            <Built />
          ) : (
            <PendingScreen path={screen.path} name={screen.name} />
          )

          return (
            <Route
              key={screen.path}
              path={screen.path}
              element={
                PUBLIC_PATHS.has(screen.path) ? (
                  element
                ) : (
                  <RequireAuth>{element}</RequireAuth>
                )
              }
            />
          )
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
