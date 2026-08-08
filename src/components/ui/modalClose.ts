import { createContext, useContext } from 'react'

/**
 * Dismisses the Modal an element is rendered inside.
 *
 * `after` runs once the overlay has fully gone. Anything that touches the page
 * underneath — scrolling to a section, moving focus — has to wait for that, or
 * it happens behind a full-screen panel and reads to the visitor as a button
 * that did nothing.
 *
 * Lives in its own file rather than beside the component: a module exporting
 * both a component and a hook breaks React Fast Refresh.
 */
export type ModalCloseFn = (after?: () => void) => void

export const ModalCloseContext = createContext<ModalCloseFn | null>(null)

/** Null outside a Modal, so shared components work in both places. */
export function useModalClose() {
  return useContext(ModalCloseContext)
}
