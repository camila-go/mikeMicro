import { Button } from './Button'
import { Chip } from './Chip'
import type { Recommendation } from '../../shared/schemas.ts'

/* Figma: the micro-certification card on the learning path. The bookmark,
   heart and share icons in the design are not reproduced: those glyphs have
   not been exported from the file, and drawing stand-ins would be guesswork. */
export function MicroCertCard({
  recommendation,
  expanded,
  onToggle,
}: {
  recommendation: Recommendation
  expanded: boolean
  onToggle: () => void
}) {
  const {
    title,
    category,
    idealFor,
    costUsd,
    months,
    collegeCredits,
    demandSignal,
    competitionSignal,
    rationale,
    skillsGained,
    courses,
  } = recommendation

  return (
    <article className="w-full overflow-clip rounded-[12px] bg-grey-100">
      <p className="bg-jetblue-100 px-[12px] py-[6px] text-center text-[12px] font-bold text-app-text">
        micro certification
      </p>

      <div className="flex flex-col gap-[12px] p-[12px]">
        <div className="flex flex-col gap-[4px]">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-200">
            {category}
          </p>
          <h3 className="text-[20px] font-bold text-app-text">{title}</h3>
          <p className="text-[12px] text-app-text">Ideal for: {idealFor}</p>
        </div>

        <p className="text-[14px] text-app-text">{rationale}</p>

        <p className="flex flex-wrap gap-x-[10px] text-[12px] text-app-text">
          <span>
            <span className="font-bold">cost:</span> $
            {costUsd.toLocaleString()}
          </span>
          <span>
            <span className="font-bold">time:</span> {months} months
          </span>
          <span className="font-bold">{collegeCredits} college credits</span>
        </p>

        <div className="flex flex-wrap gap-[6px]">
          <Chip tone="demand">{demandSignal}</Chip>
          <Chip tone="competition">{competitionSignal}</Chip>
        </div>

        <Button onClick={onToggle} aria-expanded={expanded}>
          {expanded ? 'hide course list' : 'view course list'}
        </Button>

        {expanded ? (
          <div className="flex flex-col gap-[12px] rounded-[12px] bg-white p-[12px]">
            {skillsGained.length > 0 ? (
              <div className="flex flex-col gap-[6px]">
                <p className="text-[14px] font-bold text-jetblue-500">
                  Skills you&rsquo;ll gain
                </p>
                <div className="flex flex-wrap gap-[6px]">
                  {skillsGained.map((skill) => (
                    <Chip key={skill}>{skill}</Chip>
                  ))}
                </div>
              </div>
            ) : null}

            <p className="text-[14px] font-bold text-jetblue-500">Course List</p>
            {courses.map((course) => (
              <div key={course.title} className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-bold text-app-text">
                  {course.title}
                </p>
                <p className="text-[12px] text-app-text">
                  <span className="font-bold">Institution:</span>{' '}
                  {course.institution}
                </p>
                <p className="text-[12px] text-slate-200">
                  <span className="font-bold">Details:</span> {course.details}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
