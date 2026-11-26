// Runs the production build the same way the Docker image does (Next.js standalone server).
// Used by Playwright and Lighthouse locally and in CI. Run `pnpm build` first.
import { cpSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const standaloneApp = path.join(appDir, '.next/standalone/apps/web')
const server = path.join(standaloneApp, 'server.js')

if (!existsSync(server)) {
  console.error('No standalone build found. Run `pnpm build` first.')
  process.exit(1)
}

// The standalone output leaves static assets and public/ to the host, as the Dockerfile does.
cpSync(path.join(appDir, '.next/static'), path.join(standaloneApp, '.next/static'), {
  recursive: true,
})
cpSync(path.join(appDir, 'public'), path.join(standaloneApp, 'public'), { recursive: true })

process.env.PORT ??= '3000'
// Not HOSTNAME's existing value: inside containers it is the container ID, not an address.
process.env.HOSTNAME = process.env.SERVER_HOST ?? '127.0.0.1'
await import(pathToFileURL(server).href)
