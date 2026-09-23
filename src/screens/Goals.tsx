import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Callout } from '../components/Callout'
import { ChoiceButton } from '../components/ChoiceButton'
import { Screen } from '../components/Screen'
import { Stepper } from '../components/Stepper'

const options = [
  'I want to up skill in my career',
  'I want to change my career',
  'I want suggestions for both options',
]

/* Figma: Profile/1 (9:978) unselected and Profile/1 (48:7584) selected.
   Despite the layer name these are the goals step, not a profile screen.
   Picking an option is what enables Next, which is the only difference
   between the two frames.

   The frames pin Back/Next near the bottom of a fixed 854 tall artboard.
   Here they sit in normal flow after the form, so the screen works at any
   height. */
export default function Goals() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <Screen
      header={
        <Stepper
          steps={[
            { label: 'profile', state: 'done' },
            { label: 'goals', state: 'current' },
            { label: 'timeline', state: 'upcoming' },
          ]}
        />
      }
    >
      <div className="flex w-full flex-col items-center py-[42px]">
        <Callout>
          We leverage industry data and your background and needs to help find
          your best course of action.
        </Callout>

        <div className="flex w-full flex-col gap-[24px] py-[24px]">
          <div className="flex w-full flex-col gap-[6px] text-app-text">
            <h1 className="text-[24px] font-bold">What can we help with?</h1>
            <p className="text-[14px]">
              We will need to get a better picture of your goals in order to
              help find the path that fits your needs.
            </p>
          </div>

          <div className="flex w-full flex-col gap-[12px]">
            {options.map((option) => (
              <ChoiceButton
                key={option}
                selected={selected === option}
                onClick={() => setSelected(option)}
              >
                {option}
              </ChoiceButton>
            ))}

            <label
              htmlFor="goals-note"
              className="w-full text-[14px] text-slate-200"
            >
              Leave us a note here if there&rsquo;s a job description, a skill,
              a title, or a certain field we should focus on. This is optional
              but will help us narrow our results
            </label>
            <textarea
              id="goals-note"
              rows={1}
              placeholder="Write your goals here"
              className="w-full resize-y rounded-[12px] bg-grey-100 px-[12px] py-[14px] text-[14px] text-app-text placeholder:text-slate-200 focus:outline-2 focus:outline-offset-[-2px] focus:outline-jetblue-500"
            />
          </div>
        </div>

        <div className="flex w-full gap-[12px]">
          <Button variant="secondary" block onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button
            block
            disabled={selected === null}
            onClick={() => navigate('/goals/timeline')}
          >
            Next
          </Button>
        </div>
      </div>
    </Screen>
  )
}
