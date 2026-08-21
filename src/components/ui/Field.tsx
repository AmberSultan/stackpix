import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BaseProps = {
  id: string
  /**
   * Defaults to `id`. Split from it because `id` has to be unique across the
   * whole document while `name` only has to be unique within one form, so a
   * second copy of a form can namespace its ids and still be queried by a
   * stable name.
   */
  name?: string
  label: string
  value: string
  onChange: (value: string) => void
  /** Validation message. Its presence is what marks the field invalid. */
  error?: string
  hint?: string
  required?: boolean
  placeholder?: string
  maxLength?: number
  autoComplete?: string
  className?: string
}

type Props =
  | (BaseProps & { as?: 'input'; type?: 'text' | 'email' | 'url' })
  | (BaseProps & { as: 'textarea'; rows?: number })
  | (BaseProps & { as: 'select'; options: readonly string[] })

/**
 * Labelled form control.
 *
 * The parts that are easy to skip and obvious to anyone using a screen reader:
 * a real <label> bound by id (not a placeholder pretending to be one),
 * `aria-invalid` when the field fails, and `aria-describedby` wiring the hint
 * and the error text to the input so both are announced with it.
 *
 * Errors are rendered as text, never as colour alone — colour is inaccessible
 * to anyone who cannot distinguish it.
 */
export function Field(props: Props) {
  const {
    id,
    name,
    label,
    value,
    onChange,
    error,
    hint,
    required,
    placeholder,
    maxLength,
    autoComplete,
    className,
  } = props

  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') ||
    undefined

  const shared = {
    id,
    name: name ?? id,
    value,
    required,
    placeholder,
    maxLength,
    autoComplete,
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': describedBy,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => onChange(e.target.value),
    className: cn(
      'w-full rounded-xl border bg-fill-1 px-4 py-3 text-[0.9375rem] text-accent',
      'placeholder:text-muted transition-colors duration-200',
      'focus:border-brand focus:outline-none',
      error ? 'border-red-500/60' : 'border-line hover:border-line-strong',
    ),
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-medium text-accent">
        {label}
        {required ? (
          <span className="ml-1 text-brand" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-muted">Optional</span>
        )}
      </label>

      {hint ? (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}

      {props.as === 'textarea' ? (
        <textarea {...shared} rows={props.rows ?? 5} className={cn(shared.className, 'resize-y')} />
      ) : props.as === 'select' ? (
        <select
          {...shared}
          className={cn(
            shared.className,
            'appearance-none pr-10',
            // An unchosen select should read like an unfilled input, not like
            // an answer the visitor already gave.
            value === '' && 'text-muted',
          )}
        >
          {placeholder ? (
            <option value="" disabled className="bg-card text-muted">
              {placeholder}
            </option>
          ) : null}
          {props.options.map((option) => (
            <option key={option} value={option} className="bg-card text-accent">
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input {...shared} type={props.type ?? 'text'} />
      )}

      {error ? (
        <p id={errorId} className="flex items-start gap-1.5 text-sm text-red-400">
          <span aria-hidden="true">↑</span>
          {error}
        </p>
      ) : null}
    </div>
  )
}

/** Off-screen input that only a bot fills in. Real users never see it. */
export function Honeypot({
  id = 'company-website',
  value,
  onChange,
}: {
  /** Namespaced by the form, so two forms do not both claim this id. */
  id?: string
  value: string
  onChange: (v: string) => void
}): ReactNode {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={id}>Company website</label>
      <input
        id={id}
        name="company-website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
