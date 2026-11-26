// `pnpm --filter web seed` runs this file through `payload run`.
import config from '@payload-config'
import { getPayload } from 'payload'

import { seedFigma } from './figma'

const payload = await getPayload({ config })
await seedFigma(payload)
process.exit(0)
