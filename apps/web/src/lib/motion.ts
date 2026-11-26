/*
 * Helpers for the GSAP presets (task 149). Pure, so they are unit tested; the
 * <Motion> client component plays the presets.
 */

/** Cookie that turns motion off (used by the visual and accessibility tests). */
export const MOTION_OFF_COOKIE = 'cvvip-motion'

/**
 * Runs in <head> before the first paint. Adds `html.motion`, which hides animated
 * sections' content until GSAP has set their starting state, and starts the hero intro.
 * If the motion script has not started within 4 seconds (slow or failed JS), the class
 * is removed so the content simply shows.
 */
export const motionBootScript = `(function(){var d=document.documentElement;if(/(^|; )${MOTION_OFF_COOKIE}=off/.test(document.cookie))return;d.classList.add('motion');setTimeout(function(){if(!window.__motion)d.classList.remove('motion')},4000)})()`

/** Token ease names ("power2-out", "power4-in-out", "out") as GSAP eases. */
export function gsapEase(token: string): string {
  if (token === 'out') return 'power1.out'
  if (token === 'in') return 'power1.in'
  const [name, ...dir] = token.split('-')
  const d = dir.join('-')
  return `${name}.${d === 'in-out' ? 'inOut' : d}`
}

export const seconds = (ms: number) => ms / 1000

/**
 * The text of a counting number at value `v`, keeping whatever surrounds the number
 * in the final text ("24/7", "+", "km"). Formatted like the Stats block ("1,200").
 */
export function countFrame(finalText: string, target: number, v: number): string {
  const formatted = target.toLocaleString('en')
  const at = finalText.indexOf(formatted)
  if (at === -1) return finalText
  const decimals = (formatted.split('.')[1] ?? '').length
  const current = (decimals ? v : Math.round(v)).toLocaleString('en', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return finalText.slice(0, at) + current + finalText.slice(at + formatted.length)
}
