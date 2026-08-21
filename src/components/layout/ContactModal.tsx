import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { ContactForm } from '@/components/sections/ContactForm'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { contactFormEnabled, enquiry, site } from '@/config/site'

type Props = {
  open: boolean
  onClose: () => void
  /** Preselected in the form when the visitor came from a service card. */
  service?: string
}

/**
 * The contact form as a dialog, opened from any CTA on the page.
 *
 * The header follows the visitor down the page, so its CTA can be pressed from
 * anywhere. Scrolling them to the form at the bottom would not just be slow,
 * it would lose their place, and someone who then wanted to finish reading
 * would have to hunt for where they were.
 */
export function ContactModal({ open, onClose, service }: Props) {
  return (
    <Modal
      // Remounts the body each time it opens, so a preselected service takes
      // effect and a previous submission does not linger on the next visit.
      key={open ? `open-${service ?? ''}` : 'closed'}
      open={open}
      onClose={onClose}
      variant="dialog"
      label={`Contact ${site.name}`}
    >
      <ContactDialogBody service={service} />
    </Modal>
  )
}

/**
 * Split out so `sent` lives inside the Modal subtree.
 *
 * The key above remounts that subtree on every open, which resets this state
 * for free. Holding it in ContactModal instead would leave a closed-then-
 * reopened dialog showing a blank form under a receipt heading.
 */
function ContactDialogBody({ service }: { service?: string }) {
  const [sent, setSent] = useState(false)

  return (
    <div className="px-6 pt-2 pb-8 sm:px-8">
      {/* Dropped once the message is away. "Tell us what you are building"
          above "Thanks, that's with us" asks the visitor for something they
          have just finished doing, and buries the confirmation below a prompt
          that no longer applies. */}
      {sent ? null : (
        <>
          <Eyebrow>Get in touch</Eyebrow>

          <h2 className="text-h3 mt-4 font-semibold">
            Tell us what you are building.
          </h2>

          <p className="mt-2 leading-relaxed text-muted">
            We reply within one working day with what we would do first, and why.
          </p>
        </>
      )}

      <div className={sent ? 'py-4' : 'mt-7'}>
        {contactFormEnabled ? (
          <ContactForm
            bare
            initialNeed={service}
            onSuccess={() => setSent(true)}
          />
        ) : (
          /* Same guard as the contact section: no form key means no form,
             because one that silently fails to send is worse than none. */
          <p className="leading-relaxed text-subtle">
            Email us at{' '}
            <a
              href={enquiry.proposal}
              className="text-accent underline underline-offset-4"
            >
              {site.email}
            </a>{' '}
            and we will come straight back to you.
          </p>
        )}
      </div>
    </div>
  )
}
