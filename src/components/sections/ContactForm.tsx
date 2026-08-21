import { useId, useRef, useState } from 'react'
import { Field, Honeypot } from '@/components/ui/Field'
import { ArrowRight, Check } from '@/components/ui/Icons'
import { enquiry, enquiryTypes, site } from '@/config/site'
import { scrollElementIntoView } from '@/lib/smoothScroll'
import { cn } from '@/lib/cn'

const ENDPOINT = 'https://api.web3forms.com/submit'

type Values = {
  name: string
  email: string
  link: string
  need: string
  message: string
}

type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

/** `need` starts empty so the dropdown is a real question rather than a
 *  pre-filled answer nobody read. */
const EMPTY: Values = {
  name: '',
  email: '',
  link: '',
  need: '',
  message: '',
}

/**
 * Local part: anything without a space or @. Domain: one or more dot-separated
 * labels, then a TLD of at least two letters.
 *
 * Still permissive on purpose — it accepts plus-addressing, apostrophes and
 * non-Latin domains, because every valid address wrongly rejected here is a
 * lost enquiry. What it does catch is the common real mistakes: a missing TLD
 * (`you@brand`), a doubled dot (`you@brand..com`) and a trailing dot.
 */
const EMAIL = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[a-z]{2,}$/i

function validate(values: Values): Errors {
  const errors: Errors = {}

  if (!values.name.trim()) errors.name = 'Please add a name we can use.'

  const email = values.email.trim()
  if (!email) errors.email = 'We need an email to reply to.'
  else if (!EMAIL.test(email))
    errors.email = 'That does not look like a valid email address.'

  if (!values.need) errors.need = 'Pick the closest option.'

  const message = values.message.trim()
  if (!message) errors.message = 'Tell us a little about what you need.'
  else if (message.length < 10)
    errors.message = 'A sentence or two helps us give you a useful answer.'

  return errors
}

/**
 * `bare` drops the card shell. The form supplies its own card when it sits in
 * a page section, and goes bare inside the contact dialog, which is already a
 * card — nesting the two reads as a panel inside a panel.
 */
type FormProps = {
  bare?: boolean
  /**
   * Preselects the dropdown, so someone who pressed "Get a quote" on a service
   * card is not asked a question they have just answered.
   *
   * A prop rather than a subscription: the dialog's form does not exist until
   * the dialog opens, so a message published at click time would arrive before
   * anything was listening.
   */
  initialNeed?: string
  /**
   * Fires once the message is away, so a host can react to the form changing
   * from a task into a receipt. The dialog uses it to drop its own heading:
   * "Tell us what you are building" sitting above "Thanks, that's with us"
   * asks for something the visitor has just finished doing.
   */
  onSuccess?: () => void
}

export function ContactForm({ bare = false, initialNeed, onSuccess }: FormProps = {}) {
  const [values, setValues] = useState<Values>(() =>
    initialNeed ? { ...EMPTY, need: initialNeed } : EMPTY,
  )
  const [errors, setErrors] = useState<Errors>({})
  /**
   * This form renders twice on the page: once in the contact section and again
   * inside the dialog. Element ids have to be unique across the whole
   * document, so each instance namespaces its own.
   *
   * Without this the two copies shared ids. `getElementById` and every
   * `<label for>` in the dialog resolved to the section's form instead, so an
   * invalid dialog submit moved focus to a field hidden behind the overlay.
   */
  const uid = useId()
  const fieldId = (key: keyof Values | 'honeypot') => `${uid}-${key}`
  // Scopes the focus lookup to this form. Queried by name rather than id
  // because useId() produces characters that need escaping in a selector.
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')

  const set = (key: keyof Values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }))
    // Clear a field's error as soon as the visitor starts fixing it, rather
    // than leaving red text sitting under a field they have already corrected.
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (status === 'submitting') return // guard against double-submit

    // A filled honeypot means a bot. Pretend it worked and send nothing.
    // Identical UI to a real success, or the trap announces itself.
    if (honeypot) {
      setStatus('success')
      onSuccess?.()
      return
    }

    const found = validate(values)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      // Move focus to the first problem so keyboard and screen-reader users
      // are not left guessing why nothing happened. Focus without scrolling,
      // then ease over: focus() on its own snaps, and the form is often inside
      // the contact dialog, where a snap is the only hard movement on the site.
      const first = Object.keys(found)[0]
      const field = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)
      if (field) {
        field.focus({ preventScroll: true })
        scrollElementIntoView(field)
      }
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.contactFormKey,
          subject: `New enquiry from ${values.name.trim()}: ${values.need}`,
          from_name: site.name,
          name: values.name.trim(),
          email: values.email.trim(),
          // These keys become the row labels in the email you receive, so they
          // are kept identical to the form's own labels.
          'Website or social profile': values.link.trim() || 'Not provided',
          'What do you need?': values.need,
          message: values.message.trim(),
        }),
      })

      const result = (await response.json()) as { success?: boolean }
      if (!response.ok || !result.success) throw new Error('Submission rejected')

      setStatus('success')
      setValues(EMPTY)
      onSuccess?.()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn('flex flex-col items-center gap-4 text-center', bare ? 'py-6' : 'card-surface p-10')}
        role="status"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-brand text-on-brand">
          <Check className="size-6" strokeWidth={2.5} />
        </span>
        <h3 className="text-h3 font-semibold">Thanks, that's with us.</h3>
        <p className="max-w-sm leading-relaxed text-muted">
          We read every message ourselves and reply within one working day. If
          it is urgent, email us directly at{' '}
          <a href={enquiry.quote} className="text-accent underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={cn('text-left', bare ? '' : 'card-surface p-6 md:p-9')}
    >
      {/* Announces the outcome to screen readers, which otherwise get no
          signal that anything happened after the button was pressed. */}
      <p aria-live="polite" className="sr-only">
        {status === 'submitting' ? 'Sending your message' : ''}
        {status === 'error' ? 'Your message could not be sent' : ''}
      </p>

      <Honeypot id={fieldId('honeypot')} value={honeypot} onChange={setHoneypot} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={fieldId('name')}
          name="name"
          label="Name"
          value={values.name}
          onChange={set('name')}
          error={errors.name}
          required
          maxLength={80}
          autoComplete="name"
          placeholder="Your name or brand"
        />
        <Field
          id={fieldId('email')}
          name="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={set('email')}
          error={errors.email}
          required
          maxLength={120}
          autoComplete="email"
          placeholder="you@brand.com"
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field
          id={fieldId('link')}
          name="link"
          label="Website or social profile"
          value={values.link}
          onChange={set('link')}
          maxLength={200}
          placeholder="Your social profile"
        />
        <Field
          id={fieldId('need')}
          name="need"
          as="select"
          label="What do you need?"
          value={values.need}
          onChange={set('need')}
          error={errors.need}
          required
          placeholder="Select one…"
          options={enquiryTypes}
        />
      </div>

      <Field
        id={fieldId('message')}
        name="message"
        as="textarea"
        label="Tell us about it"
        value={values.message}
        onChange={set('message')}
        error={errors.message}
        required
        maxLength={2000}
        className="mt-5"
        placeholder="What are you selling, and what is not working right now?"
      />

      {status === 'error' ? (
        <div className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm">
          <p className="font-medium text-red-300">That did not send.</p>
          <p className="mt-1 leading-relaxed text-subtle">
            Something went wrong at our end. Your message is still in the form,
            so nothing is lost. Try again, or email us at{' '}
            <a href={enquiry.quote} className="text-accent underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={cn(
          'group mt-7 inline-flex h-[3.25rem] w-full cursor-pointer items-center justify-center gap-2',
          'rounded-full bg-brand px-7 text-[0.9375rem] font-medium text-on-brand',
          'transition-all duration-300 ease-[var(--ease-out-quint)]',
          'hover:bg-brand-bright active:scale-[0.99]',
          'disabled:cursor-wait disabled:opacity-70 sm:w-auto',
        )}
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
        {status === 'submitting' ? (
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        ) : (
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        )}
      </button>

      {/* Says the reassurance in plain words. An earlier version read "no
          follow-up sequence", meaning automated drip email — but "follow-up"
          reads to a business owner as "we will get back to you", so the line
          accidentally promised the opposite of what it meant. */}
      <p className="mt-4 text-xs text-muted">
        We reply within one working day. No spam, and your details are never
        shared.
      </p>
    </form>
  )
}
