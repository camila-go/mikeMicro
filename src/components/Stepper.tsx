import check from '../assets/icons/check.svg'

export type StepState = 'done' | 'current' | 'upcoming'

export type Step = {
  label: string
  state: StepState
}

/* Figma: the wizard's step bar (9:1098). A 52px grey-100 strip with the steps
   centred, 24px apart. Completed steps get the check glyph and turn
   jetblue-500; the current step is bold black; upcoming steps are plain. */
export function Stepper({ steps }: { steps: Step[] }) {
  return (
    <nav
      aria-label="Progress"
      className="flex h-[52px] w-full items-center justify-center gap-[24px] bg-grey-100 px-[24px]"
    >
      {steps.map(({ label, state }) => (
        <span key={label} className="flex items-center justify-center">
          {state === 'done' ? (
            <img src={check} alt="" className="size-[24px] shrink-0" />
          ) : null}
          <span
            aria-current={state === 'current' ? 'step' : undefined}
            className={`text-center text-[14px] ${
              state === 'done'
                ? 'text-jetblue-500'
                : state === 'current'
                  ? 'font-bold text-black'
                  : 'text-black'
            }`}
          >
            {label}
          </span>
        </span>
      ))}
    </nav>
  )
}
