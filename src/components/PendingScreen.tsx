import { Link, useNavigate } from 'react-router-dom'
import { screens } from '../data/screens'
import { Button } from './Button'
import { Screen } from './Screen'

/* Placeholder for screens still waiting on design context from Figma.
   Replaced screen by screen as each frame is pulled.

   It carries a Continue so the flow can still be walked end to end instead of
   dead-ending here, which is otherwise indistinguishable from a broken
   sign-in. */
export function PendingScreen({ path, name }: { path: string; name: string }) {
  const navigate = useNavigate()
  const index = screens.findIndex((screen) => screen.path === path)
  const next = index >= 0 ? screens[index + 1] : undefined

  return (
    <Screen variant="center">
      <div className="flex w-full max-w-[301px] flex-col items-center gap-[12px] text-center">
        <p className="text-[24px] font-bold text-app-text">{name}</p>
        <p className="text-[14px] text-slate-200">
          This screen is not built yet. Continue to keep moving through the
          flow.
        </p>
        {next ? (
          <Button block onClick={() => navigate(next.path)} className="mt-[12px]">
            Continue to {next.name}
          </Button>
        ) : null}
        <Link to="/" className="text-[14px] font-bold text-app-link">
          All screens
        </Link>
      </div>
    </Screen>
  )
}
