// Regenerates the CSS files from src/tokens.ts. Run: pnpm --filter @ceylonvvip/tokens generate
import { writeFileSync } from 'node:fs'

import { buildThemeCss, buildTokensCss } from '../src/css.ts'

const out = new URL('../src/', import.meta.url)
writeFileSync(new URL('tokens.css', out), buildTokensCss())
writeFileSync(new URL('theme.css', out), buildThemeCss())
console.log('Wrote src/tokens.css and src/theme.css')
