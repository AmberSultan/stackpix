import type { EnquiryType } from '@/config/site'

/**
 * Carries "they clicked Get a quote on *this* service" from a service card to
 * the contact form.
 *
 * A tiny publish/subscribe module rather than React context: the two ends sit
 * in different branches of the tree, and a provider wrapping the whole app to
 * move one string between them is more machinery than the job needs. It also
 * keeps the form's state updates inside a callback, which is where they
 * belong — setting state from an effect that watches context would re-render
 * the form every time the value changed.
 */
type Listener = (service: EnquiryType) => void

const listeners = new Set<Listener>()

/** Called by a service card. */
export function requestQuote(service: EnquiryType) {
  listeners.forEach((listener) => listener(service))
}

/** Called by the form. Returns an unsubscribe function. */
export function onQuoteRequest(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
