import { z } from 'zod'

/* The shapes the model is constrained to return. These mirror the designed
   screens: the profile fields are the sections on "Does this look okay?", and
   the recommendation fields are what the micro-certification card renders. If
   a field is not on a screen, it does not belong here. */

export const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  /* Free text rather than dates, because resumes write ranges every which way
     and the card just prints what was written, e.g. "2018-present". */
  period: z.string(),
})

export const EducationSchema = z.object({
  credential: z.string(),
  institution: z.string(),
})

export const ProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  location: z.string(),
  summary: z.string(),
  experience: z.array(ExperienceSchema),
  softSkills: z.array(z.string()),
  industryKnowledge: z.array(z.string()),
  education: z.array(EducationSchema),
})

export const CourseSchema = z.object({
  title: z.string(),
  institution: z.string(),
  details: z.string(),
})

export const RecommendationSchema = z.object({
  title: z.string(),
  /* Printed above the title on the card, e.g. "BUSINESS & CORPORATE
     LEADERSHIP". */
  category: z.string(),
  idealFor: z.string(),
  costUsd: z.number(),
  months: z.number(),
  collegeCredits: z.number(),
  /* The two market-signal chips. Short phrases, e.g. "high demand in NYC". */
  demandSignal: z.string(),
  competitionSignal: z.string(),
  /* Why this fits the person, shown as the card's lead paragraph. */
  rationale: z.string(),
  skillsGained: z.array(z.string()),
  courses: z.array(CourseSchema),
})

export const RecommendationSetSchema = z.object({
  recommendations: z.array(RecommendationSchema),
})

export type Experience = z.infer<typeof ExperienceSchema>
export type Education = z.infer<typeof EducationSchema>
export type Profile = z.infer<typeof ProfileSchema>
export type Course = z.infer<typeof CourseSchema>
export type Recommendation = z.infer<typeof RecommendationSchema>

/* What the goals wizard collects and feeds into the recommendation call. */
export type Goals = {
  intent: string
  timeline: string
  note: string
}
