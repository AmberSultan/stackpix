import type { EnquiryType } from '@/config/site'

/**
 * Opens the contact dialog from anywhere on the page.
 *
 * Replaces the older "scroll to the form" behaviour. Every contact CTA now
 * calls this, so it does not matter where the visitor is when they press it:
 * the dialog comes to them rather than moving them to the bottom of the page
 * and losing their place.
 *
 * The optional service is carried as *state on the opener*, not published to
 * the form. Publishing would not work: the dialog's form is unmounted until
 * the dialog opens, so it would miss a message sent a moment earlier. The
 * navbar holds it and passes it down as the form's initial value instead.
 */
type Listener = (service?: EnquiryType) => void

const listeners = new Set<Listener>()

/** Called by any CTA. Pass a service to preselect it in the form. */
export function openContactDialog(service?: EnquiryType) {
  listeners.forEach((listener) => listener(service))
}

/** Called by whichever component owns the dialog. Returns an unsubscribe fn. */
export function onOpenContactDialog(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
