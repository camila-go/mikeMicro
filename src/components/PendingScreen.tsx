import { Link } from 'react-router-dom'
import { Screen } from './Screen'

/* Placeholder for screens still waiting on design context from Figma.
   Replaced screen by screen as each frame is pulled. */
export function PendingScreen({ name }: { name: string }) {
  return (
    <Screen variant="center">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-[16px] font-bold text-app-text">{name}</p>
        <p className="text-[14px] text-slate-200">
          Waiting on design context from Figma.
        </p>
        <Link to="/" className="mt-2 text-[14px] font-bold text-app-link">
          All screens
        </Link>
      </div>
    </Screen>
  )
}
