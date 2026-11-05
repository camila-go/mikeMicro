import type { Goals, Profile, Recommendation } from '../../shared/schemas.ts'

/* These hit the functions under api/, which hold the Anthropic key. The key
   is never sent to or stored in the browser. */
async function post<T>(path: string, body: unknown): Promise<T> {
  let response: Response
  try {
    response = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('Could not reach the server. Check your connection.')
  }

  const payload = (await response.json().catch(() => null)) as
    | { error?: string }
    | T
    | null

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'error' in payload
        ? (payload as { error?: string }).error
        : undefined
    throw new Error(message ?? `Request failed (${response.status}).`)
  }

  return payload as T
}

export async function parseResume(resumeText: string): Promise<Profile> {
  const { profile } = await post<{ profile: Profile }>('/api/parse-resume', {
    resumeText,
  })
  return profile
}

export async function fetchRecommendations(
  profile: Profile,
  goals: Goals,
): Promise<Recommendation[]> {
  const { recommendations } = await post<{ recommendations: Recommendation[] }>(
    '/api/recommend',
    { profile, goals },
  )
  return recommendations
}
