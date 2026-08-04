/**
 * Minimal class-name joiner. Deliberately not `clsx` + `tailwind-merge` —
 * this site has no runtime class conflicts to resolve, and two dependencies
 * on the critical path is a worse trade than ten lines of code.
 *
 * Accepts `unknown` so the common `someNode && 'class'` guard type-checks
 * whatever the left-hand side happens to be, then keeps only real strings.
 */
export function cn(...classes: unknown[]): string {
  return classes.filter((value): value is string => typeof value === 'string').join(' ')
}
