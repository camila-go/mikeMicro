import type { ReactNode } from 'react'

type Tone = 'demand' | 'competition' | 'neutral'

/* Market-signal chips that sit under the cost/time row on a
   micro-certification card: "high demand in NYC", "low competition". */
const tones: Record<Tone, string> = {
  demand: 'bg-chip-demand text-slate-300',
  competition: 'bg-chip-competition text-slate-300',
  neutral: 'bg-grey-200 text-slate-300',
}

export function Chip({
  tone = 'neutral',
  children,
}: {
  tone?: Tone
  children: ReactNode
}) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-1 text-[11px] font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
