import Anthropic from '@anthropic-ai/sdk'
import {
  MissingApiKeyError,
  ModelRefusalError,
  parseResume,
  recommend,
} from './ai.ts'

export type ApiResult = {
  status: number
  body: unknown
}

/* One dispatch table shared by both entry points: the Vercel functions under
   api/ in production, and the dev middleware in vite.config.ts. Keeping the
   logic here means local development exercises the same code that ships. */
const routes: Record<string, (body: Record<string, unknown>) => Promise<unknown>> =
  {
    '/api/parse-resume': async (body) => {
      const resumeText = body.resumeText
      if (typeof resumeText !== 'string') {
        throw new BadRequestError('Expected a resumeText string.')
      }
      return { profile: await parseResume(resumeText) }
    },

    '/api/recommend': async (body) => {
      const { profile, goals } = body
      if (!profile || typeof profile !== 'object') {
        throw new BadRequestError('Expected a profile object.')
      }
      if (!goals || typeof goals !== 'object') {
        throw new BadRequestError('Expected a goals object.')
      }
      return {
        recommendations: await recommend(
          profile as Parameters<typeof recommend>[0],
          goals as Parameters<typeof recommend>[1],
        ),
      }
    },
  }

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BadRequestError'
  }
}

export function isApiRoute(path: string): boolean {
  return path in routes
}

export async function handleApi(
  path: string,
  body: Record<string, unknown>,
): Promise<ApiResult> {
  const route = routes[path]
  if (!route) return { status: 404, body: { error: 'Not found' } }

  try {
    return { status: 200, body: await route(body) }
  } catch (error) {
    return toErrorResult(error)
  }
}

/* The client shows `error` to the person, so these strings are user-facing.
   Nothing here echoes the resume back, since it is personal data. */
function toErrorResult(error: unknown): ApiResult {
  if (error instanceof MissingApiKeyError) {
    return { status: 503, body: { error: error.message } }
  }
  if (error instanceof BadRequestError) {
    return { status: 400, body: { error: error.message } }
  }
  if (error instanceof ModelRefusalError) {
    return { status: 422, body: { error: error.message } }
  }

  if (error instanceof Anthropic.AuthenticationError) {
    return { status: 503, body: { error: 'The Anthropic API key was rejected.' } }
  }
  if (error instanceof Anthropic.RateLimitError) {
    return {
      status: 429,
      body: { error: 'Rate limited by the Anthropic API. Try again shortly.' },
    }
  }
  if (error instanceof Anthropic.APIConnectionError) {
    return { status: 504, body: { error: 'Could not reach the Anthropic API.' } }
  }
  if (error instanceof Anthropic.APIError) {
    return {
      status: error.status && error.status >= 500 ? 502 : 400,
      body: { error: `Anthropic API error: ${error.message}` },
    }
  }

  return {
    status: 500,
    body: {
      error: error instanceof Error ? error.message : 'Something went wrong.',
    },
  }
}
