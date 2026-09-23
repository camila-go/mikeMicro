import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { ComponentType } from 'react'
import { PendingScreen } from './components/PendingScreen'
import { screens } from './data/screens'
import Goals from './screens/Goals'
import Index from './screens/Index'
import Join from './screens/Join'
import SignIn from './screens/SignIn'
import Splash from './screens/Splash'

/* Screens built from design context. Anything not listed here still renders
   a placeholder, so the route map stays complete while the screens land. */
const built: Record<string, ComponentType> = {
  '/splash': Splash,
  '/sign-in': SignIn,
  '/join': Join,
  '/goals': Goals,
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {screens.map((screen) => {
          const Built = built[screen.path]

          return (
            <Route
              key={screen.path}
              path={screen.path}
              element={
                Built ? (
                  <Built />
                ) : (
                  <PendingScreen path={screen.path} name={screen.name} />
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
