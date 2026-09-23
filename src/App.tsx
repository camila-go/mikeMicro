import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { ComponentType } from 'react'
import { PendingScreen } from './components/PendingScreen'
import { screens } from './data/screens'
import Index from './screens/Index'
import SignIn from './screens/SignIn'
import Splash from './screens/Splash'

/* Screens built from design context. Anything not listed here still renders
   a placeholder, so the route map stays complete while the screens land. */
const built: Record<string, ComponentType> = {
  '/splash': Splash,
  '/sign-in': SignIn,
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
                <div className="flex min-h-svh items-start justify-center py-8">
                  {Built ? <Built /> : <PendingScreen name={screen.name} />}
                </div>
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
