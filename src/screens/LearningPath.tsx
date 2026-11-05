import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { MicroCertCard } from '../components/MicroCertCard'
import { Screen } from '../components/Screen'
import { fetchRecommendations } from '../lib/api'
import { useAppState } from '../state/appContext'

/* Figma: "This micro certificate was made for you". The cards are generated
   from the profile the resume step produced and the goals the wizard
   collected, so the claim that it was made for you is literally true. */
export default function LearningPath() {
  const navigate = useNavigate()
  const { profile, goals, recommendations, setRecommendations } = useAppState()

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!profile) return
    setError(null)
    setBusy(true)
    try {
      setRecommendations(await fetchRecommendations(profile, goals))
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }, [profile, goals, setRecommendations])

  /* Generated once and kept, so returning to this screen does not spend
     another request. "reset my goals" is the way to ask for a fresh set. */
  useEffect(() => {
    if (profile && !recommendations && !busy && !error) void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, recommendations])

  if (!profile) {
    return (
      <Screen variant="center">
        <div className="flex max-w-[301px] flex-col items-center gap-[12px] text-center">
          <p className="text-[24px] font-bold text-app-text">
            Nothing to build on yet
          </p>
          <p className="text-[14px] text-slate-200">
            Add your resume and tell us your goals, then we can put a path
            together.
          </p>
          <Link to="/resume" className="text-[14px] font-bold text-app-link">
            Start with your resume
          </Link>
        </div>
      </Screen>
    )
  }

  return (
    <Screen>
      <div className="flex w-full flex-col gap-[24px] py-[24px]">
        <div className="flex w-full flex-col gap-[6px]">
          <h1 className="text-[24px] font-bold text-jetblue-500">
            {recommendations?.length === 1
              ? 'This micro certificate was made for you'
              : 'These micro certificates were made for you'}
          </h1>
          <p className="text-[14px] text-app-text">
            Built from your resume and the goals you told us about.
          </p>
        </div>

        {busy ? (
          <p className="text-[14px] text-slate-200">
            Matching you to micro certificates...
          </p>
        ) : null}

        {error ? (
          <div className="flex w-full flex-col gap-[12px]">
            <p
              role="alert"
              className="w-full rounded-[12px] bg-chip-demand px-[12px] py-[14px] text-[14px] text-app-text"
            >
              {error}
            </p>
            <Button block onClick={() => void load()}>
              Try again
            </Button>
          </div>
        ) : null}

        {recommendations?.map((recommendation) => (
          <MicroCertCard
            key={recommendation.title}
            recommendation={recommendation}
            expanded={expanded === recommendation.title}
            onToggle={() =>
              setExpanded((current) =>
                current === recommendation.title ? null : recommendation.title,
              )
            }
          />
        ))}

        {recommendations && !busy ? (
          <div className="flex w-full flex-col gap-[12px]">
            <Button
              block
              onClick={() => {
                setRecommendations(null)
                void load()
              }}
            >
              see more options
            </Button>
            <Button
              variant="secondary"
              block
              onClick={() => {
                setRecommendations(null)
                navigate('/goals')
              }}
            >
              reset my goals
            </Button>
          </div>
        ) : null}
      </div>
    </Screen>
  )
}
