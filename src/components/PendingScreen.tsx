import { PhoneFrame } from './PhoneFrame'

/* Placeholder for screens still waiting on design context from the Figma
   Dev Mode MCP server. Replaced screen by screen as each frame is pulled. */
export function PendingScreen({ name }: { name: string }) {
  return (
    <PhoneFrame>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8 text-center">
        <p className="text-base font-semibold text-slate-300">{name}</p>
        <p className="text-xs text-slate-200">
          Waiting on design context from Figma.
        </p>
      </div>
    </PhoneFrame>
  )
}
