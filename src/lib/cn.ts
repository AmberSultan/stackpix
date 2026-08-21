/**
 * Minimal class-name joiner. Deliberately not `clsx` + `tailwind-merge`:
 * this site has no runtime class conflicts to resolve, and two dependencies
 * on the critical path is a worse trade than a dozen lines of code.
 *
 * Accepts `unknown` so the common `someNode && 'class'` guard type-checks
 * whatever the left-hand side happens to be, then keeps only real strings.
 *
 * Arrays are flattened, which is not a nicety. Grouping a variant's classes
 * in an array is the obvious way to write `isDialog ? [...] : [...]`, and an
 * earlier version dropped anything that was not a string — so those branches
 * vanished with no type error and no warning. The dialog lost `relative`
 * among others, which let the absolutely-positioned backdrop paint over its
 * own panel: the form was in the DOM, correct and invisible, hidden behind
 * the scrim with only the sticky (and so positioned) header showing through.
 * If this ever needs to accept objects too, make them fail loudly, not
 * silently.
 */
export function cn(...classes: unknown[]): string {
  const out: string[] = []

  const collect = (value: unknown) => {
    if (typeof value === 'string') {
      if (value) out.push(value)
    } else if (Array.isArray(value)) {
      value.forEach(collect)
    }
  }

  classes.forEach(collect)
  return out.join(' ')
}
