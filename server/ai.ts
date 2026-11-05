import Anthropic from '@anthropic-ai/sdk'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import {
  ProfileSchema,
  RecommendationSetSchema,
  type Goals,
  type Profile,
  type Recommendation,
} from '../shared/schemas.ts'

/* Claude Opus 5.5. Thinking is always on for this model, so the `thinking`
   parameter is omitted deliberately: sending `disabled` or a token budget is
   rejected. Depth is controlled with output_config.effort, whose default on
   this model is "medium", so each call sets it explicitly. */
const MODEL = 'claude-opus-5-5'

/* Resumes are pasted by hand, so cap what reaches the model. Roughly 30k
   characters is a very long CV and still far inside the context window. */
const MAX_RESUME_CHARS = 30_000

export class MissingApiKeyError extends Error {
  constructor() {
    super(
      'ANTHROPIC_API_KEY is not set. Add it to .env.local (see .env.example).',
    )
    this.name = 'MissingApiKeyError'
  }
}

export class ModelRefusalError extends Error {
  constructor(explanation: string) {
    super(explanation)
    this.name = 'ModelRefusalError'
  }
}

function client(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) throw new MissingApiKeyError()
  return new Anthropic()
}

/* Opus 5.5 can decline a request outright. That arrives as a 200 with
   stop_reason "refusal", not as a thrown error, so every call checks it
   before reading content. */
function assertNotRefused(response: { stop_reason: string | null; stop_details?: unknown }) {
  if (response.stop_reason !== 'refusal') return
  const details = response.stop_details as
    | { explanation?: string | null }
    | null
    | undefined
  throw new ModelRefusalError(
    details?.explanation ?? 'The model declined to process this request.',
  )
}

const PARSE_SYSTEM = `You convert a resume into structured profile data for Mike, a micro-credential platform.

Extract only what the resume actually states. Do not invent employers, dates, credentials or skills. If the resume does not give a location, return an empty string rather than guessing.

For softSkills and industryKnowledge, use short title-case labels of one to three words, the way they would read as chips in a UI, for example "Communication", "Market Analysis". Draw them from evidence in the resume rather than from a generic list.

Write summary as a single sentence in the person's own professional voice, describing what they do and where they are heading.`

export async function parseResume(resumeText: string): Promise<Profile> {
  const text = resumeText.trim()
  if (!text) throw new Error('No resume text was provided.')
  if (text.length > MAX_RESUME_CHARS) {
    throw new Error(
      `That resume is ${text.length.toLocaleString()} characters, over the ${MAX_RESUME_CHARS.toLocaleString()} character limit.`,
    )
  }

  const response = await client().messages.parse({
    model: MODEL,
    max_tokens: 16000,
    system: PARSE_SYSTEM,
    /* Extraction, not open-ended reasoning, so the lowest useful depth. */
    output_config: {
      effort: 'low',
      format: zodOutputFormat(ProfileSchema),
    },
    messages: [{ role: 'user', content: text }],
  })

  assertNotRefused(response)
  if (!response.parsed_output) {
    throw new Error('The model did not return a profile in the expected shape.')
  }
  return response.parsed_output
}

const RECOMMEND_SYSTEM = `You recommend micro-credentials for Mike, a platform that matches working professionals to short, stackable certifications.

You are given someone's profile and the goals they just told us. Recommend three micro-credentials that move them from where they are to where they want to go, ordered best fit first.

Ground every recommendation in the profile. The rationale must refer to that person's actual experience and stated goal, not generic career advice.

Respect the timeline they chose: do not recommend a four-year commitment to someone who asked for weeks to months.

costUsd, months and collegeCredits are realistic estimates for a credential of that kind. demandSignal and competitionSignal are short market phrases of three to five words, for example "high demand in NYC" and "low competition". Base them on the person's location and field.

Each recommendation lists three to five real, specific courses with the institution that offers that kind of programme.`

export async function recommend(
  profile: Profile,
  goals: Goals,
): Promise<Recommendation[]> {
  const response = await client().messages.parse({
    model: MODEL,
    max_tokens: 16000,
    system: RECOMMEND_SYSTEM,
    /* This is the judgement call the product exists to make, so it gets a
       higher effort setting than the extraction step. */
    output_config: {
      effort: 'high',
      format: zodOutputFormat(RecommendationSetSchema),
    },
    messages: [
      {
        role: 'user',
        content: [
          'Profile:',
          JSON.stringify(profile, null, 2),
          '',
          'What they want:',
          `- Goal: ${goals.intent}`,
          `- Time they can commit: ${goals.timeline}`,
          goals.note ? `- In their words: ${goals.note}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
      },
    ],
  })

  assertNotRefused(response)
  if (!response.parsed_output) {
    throw new Error(
      'The model did not return recommendations in the expected shape.',
    )
  }
  return response.parsed_output.recommendations
}
