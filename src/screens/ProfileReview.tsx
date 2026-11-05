import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { Screen } from '../components/Screen'
import { useAppState } from '../state/appContext'

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex w-full flex-col gap-[8px] border-b border-jetblue-500 pb-[8px]">
      <h2 className="text-[16px] font-bold text-app-text">{title}</h2>
      {children}
    </section>
  )
}

/* Figma: "Does this look okay?" in the Sign In section. Everything here is
   the model's output from the resume step, so it is a genuine review screen
   rather than a static mock. */
export default function ProfileReview() {
  const navigate = useNavigate()
  const { profile } = useAppState()

  if (!profile) {
    return (
      <Screen variant="center">
        <div className="flex max-w-[301px] flex-col items-center gap-[12px] text-center">
          <p className="text-[24px] font-bold text-app-text">No profile yet</p>
          <p className="text-[14px] text-slate-200">
            Add your resume first and we&rsquo;ll build this from it.
          </p>
          <Link
            to="/resume"
            className="text-[14px] font-bold text-app-link"
          >
            Go to the resume step
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
            {profile.name}
          </h1>
          <p className="text-[14px] text-app-text">
            {[profile.title, profile.location].filter(Boolean).join(' | ')}
          </p>
          <p className="text-[14px] text-app-text">{profile.summary}</p>
        </div>

        {profile.experience.length > 0 ? (
          <Section title="Experience">
            {profile.experience.map((role) => (
              <div
                key={`${role.company}-${role.role}-${role.period}`}
                className="flex flex-col"
              >
                <p className="text-[14px] font-bold text-app-text">
                  {role.company}
                </p>
                <p className="text-[14px] text-app-text">{role.role}</p>
                <p className="text-[14px] text-slate-200">{role.period}</p>
              </div>
            ))}
          </Section>
        ) : null}

        {profile.softSkills.length > 0 ? (
          <Section title="Soft Skills">
            <div className="flex flex-wrap gap-[6px]">
              {profile.softSkills.map((skill) => (
                <Chip key={skill}>{skill}</Chip>
              ))}
            </div>
          </Section>
        ) : null}

        {profile.industryKnowledge.length > 0 ? (
          <Section title="Industry Knowledge">
            <div className="flex flex-wrap gap-[6px]">
              {profile.industryKnowledge.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </Section>
        ) : null}

        {profile.education.length > 0 ? (
          <Section title="Education">
            {profile.education.map((entry) => (
              <div key={`${entry.credential}-${entry.institution}`}>
                <p className="text-[14px] font-bold text-app-text">
                  {entry.credential}
                </p>
                <p className="text-[14px] text-slate-200">
                  {entry.institution}
                </p>
              </div>
            ))}
          </Section>
        ) : null}

        <div className="flex w-full flex-col gap-[12px]">
          <h2 className="text-[24px] font-bold text-app-text">
            Does this look okay?
          </h2>
          <Button block onClick={() => navigate('/goals')}>
            Looks good
          </Button>
          <Button variant="secondary" block onClick={() => navigate('/resume')}>
            edit profile
          </Button>
        </div>
      </div>
    </Screen>
  )
}
