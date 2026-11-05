import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* In production the functions under api/ serve these routes. Vite does not
   run those, so dev mounts the same dispatch table as middleware. Both paths
   call the identical handler, so local behaviour matches what ships. */
function apiDevServer(): Plugin {
  return {
    name: 'mike-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url ?? '').split('?')[0]
        if (!path.startsWith('/api/')) return next()

        /* Imported lazily and through the module runner so edits to the
           handlers hot-reload like the rest of the app. */
        const { handleApi, isApiRoute } = await server.ssrLoadModule(
          '/server/routes.ts',
        )
        if (!isApiRoute(path)) return next()

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const raw = Buffer.concat(chunks).toString('utf8')
          const body = raw ? JSON.parse(raw) : {}

          const result = await handleApi(path, body)
          res.statusCode = result.status
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify(result.body))
        } catch (error) {
          res.statusCode = 400
          res.setHeader('content-type', 'application/json')
          res.end(
            JSON.stringify({
              error:
                error instanceof Error ? error.message : 'Malformed request.',
            }),
          )
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  /* The empty prefix loads every key, not just VITE_ ones, so the dev
     middleware can read ANTHROPIC_API_KEY from .env.local. These stay in
     process.env on the server and are never exposed to the client bundle. */
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), tailwindcss(), apiDevServer()],
  }
})
