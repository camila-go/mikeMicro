import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleApi } from '../server/routes.ts'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const { status, body } = await handleApi('/api/parse-resume', req.body ?? {})
  res.status(status).json(body)
}
