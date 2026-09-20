import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PendingScreen } from './components/PendingScreen'
import { screens } from './data/screens'
import Index from './screens/Index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {screens.map((screen) => (
          <Route
            key={screen.path}
            path={screen.path}
            element={
              <div className="flex min-h-svh items-start justify-center py-8">
                <PendingScreen name={screen.name} />
              </div>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
