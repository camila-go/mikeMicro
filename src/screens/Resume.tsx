import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Screen } from '../components/Screen'
import { Select } from '../components/Select'
import { Stepper } from '../components/Stepper'
import { parseResume } from '../lib/api'
import { useAppState } from '../state/appContext'

const LEARNING_PREFERENCES = ['Online', 'In person', 'Hybrid']
const EDUCATION_LEVELS = [
  'High school',
  "Associate's",
  "Bachelor's",
  "Master's",
  'Doctorate',
]

/* Figma: "Digitize your resume with AI" in the Sign In section, empty and
   filled states. This is the first of the two steps where the model actually
   runs: the resume is sent to /api/parse-resume, which returns the structured
   profile the next screen reviews. */
export default function Resume() {
  const navigate = useNavigate()
  const { setProfile } = useAppState()
  const fileInput = useRef<HTMLInputElement>(null)

  const [resumeText, setResumeText] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [preference, setPreference] = useState('')
  const [education, setEducation] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onFile(file: File) {
    setError(null)
    try {
      /* Read in the browser so the file itself never leaves the device; only
         the extracted text is sent on. */
      const text = await file.text()
      setResumeText(text)
      setFileName(file.name)
    } catch {
      setError('That file could not be read. Try pasting the text instead.')
    }
  }

  async function onNext() {
    setError(null)
    setBusy(true)
    try {
      const profile = await parseResume(resumeText)
      setProfile(profile)
      navigate('/profile-review')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Screen
      header={
        <Stepper
          steps={[
            { label: 'profile', state: 'current' },
            { label: 'goals', state: 'upcoming' },
            { label: 'timeline', state: 'upcoming' },
          ]}
        />
      }
    >
      <div className="flex w-full flex-col gap-[24px] py-[24px]">
        <div className="flex w-full flex-col gap-[6px] text-app-text">
          <h1 className="text-[24px] font-bold">Digitize your resume with AI</h1>
          <p className="text-[14px]">
            We&rsquo;ll analyze your current skills and experience to identify
            gaps and recommend the best learning path tailored to you.
          </p>
        </div>

        <div className="flex w-full items-center gap-[12px]">
          <input
            ref={fileInput}
            type="file"
            accept=".txt,.md,text/plain,text/markdown"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) void onFile(file)
            }}
          />
          <Button
            variant="secondary"
            onClick={() => fileInput.current?.click()}
            className="flex-1"
          >
            {fileName ?? 'upload resume'}
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => {
              setFileName(null)
              fileInput.current?.focus()
            }}
          >
            do this manually
          </Button>
        </div>

        <label htmlFor="resume-text" className="sr-only">
          Resume text
        </label>
        <textarea
          id="resume-text"
          value={resumeText}
          onChange={(event) => setResumeText(event.target.value)}
          placeholder="Or paste your resume here"
          rows={8}
          className="w-full resize-y rounded-[12px] bg-grey-100 px-[12px] py-[14px] text-[14px] text-app-text placeholder:text-slate-200 focus:outline-2 focus:outline-offset-[-2px] focus:outline-jetblue-500"
        />

        <Select
          label="Learning Preference"
          placeholder="select preference"
          options={LEARNING_PREFERENCES}
          value={preference}
          onChange={(event) => setPreference(event.target.value)}
        />
        <Select
          label="Highest education"
          placeholder="select preference"
          options={EDUCATION_LEVELS}
          value={education}
          onChange={(event) => setEducation(event.target.value)}
        />

        {error ? (
          <p
            role="alert"
            className="w-full rounded-[12px] bg-chip-demand px-[12px] py-[14px] text-[14px] text-app-text"
          >
            {error}
          </p>
        ) : null}

        <div className="flex w-full gap-[12px]">
          <Button variant="secondary" block onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button
            block
            disabled={resumeText.trim().length === 0 || busy}
            onClick={() => void onNext()}
          >
            {busy ? 'Reading your resume...' : 'Next'}
          </Button>
        </div>
      </div>
    </Screen>
  )
}
