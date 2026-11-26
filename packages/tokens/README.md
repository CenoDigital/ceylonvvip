# @ceylonvvip/tokens

Design tokens from the Figma file `bIUkCC5TtQezAqa4RwLPI3`: the Primitives and Theme variable collections, the Outfit text styles and the "Motion spec (GSAP)" section on 03 Design system.

| File             | What it is                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| `src/tokens.ts`  | The source. Palette, light and dark theme (shadcn names), space, radius, type, easing, motion. |
| `src/tokens.css` | Generated CSS variables. Light theme on `:root`, dark on `.dark` or `[data-theme='dark']`.     |
| `src/theme.css`  | Generated Tailwind v4 theme: `bg-background`, `text-brand`, `text-h1`, `p-16`, `rounded-lg`... |

```css
@import 'tailwindcss';
@import '@ceylonvvip/tokens/tokens.css';
@import '@ceylonvvip/tokens/theme.css';
```

- Type is fluid between the two Figma widths, 390px and 1440px, using each mobile and desktop pair (`M/H1` and `D/H1` become `text-h1`). Styles without a mobile pair are fixed. Uppercase styles have a `-caps` utility, such as `text-label-caps`.
- Spacing is 1px per step, so `p-16` is Figma's `space/16`.
- Motion durations and easings are CSS variables (`--motion-fade-up-duration`, `--ease-power2-out`) and TypeScript values (`motion.fadeUp`, `ease['power2-out'].gsap`). With reduced motion, every duration becomes 300ms.
- Not exported, on purpose: the Theme mode "White (previous)" and the "Gold foil" style. Gold is always the flat gold and bronze.

Figma is the source of truth. To change a token, change Figma first, update `src/tokens.ts`, then run `pnpm --filter @ceylonvvip/tokens generate`. A test fails if the CSS files are out of date.
