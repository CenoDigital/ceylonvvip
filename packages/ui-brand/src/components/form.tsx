'use client'

import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'

import { Icon } from '../icons/Icon'
import { cn } from '../lib/cn'

/*
 * Form controls from Figma: Prestige/Field, Field/Select, Chip, Stepper and
 * Vehicle option. All are native inputs, so they work with the keyboard, screen
 * readers, autofill and the phone's own pickers.
 */

// Prestige/Field: small label, value, hairline below. Hover darkens the line, focus
// draws a 2px ring line and darkens the label, error turns both red with a message.
const fieldWrap = cn(
  'group/field relative flex flex-col gap-12 border-b border-border pb-16',
  'hover:border-foreground focus-within:border-b-2 focus-within:border-ring focus-within:pb-15',
  'has-[:disabled]:opacity-45 has-[:disabled]:hover:border-border',
  'data-[invalid=true]:border-b-2 data-[invalid=true]:border-destructive data-[invalid=true]:pb-15',
)
const fieldLabel = cn(
  'text-label-caps text-muted-foreground transition-colors duration-150',
  'group-focus-within/field:text-foreground group-data-[invalid=true]/field:text-destructive',
)
export const fieldControl = cn(
  'w-full bg-transparent text-body text-foreground outline-none placeholder:text-muted-foreground',
  'disabled:cursor-not-allowed',
)

interface FieldShellProps {
  label: ReactNode
  error?: ReactNode
  hint?: ReactNode
  className?: string
  children: (ids: { id: string; describedBy?: string }) => ReactNode
}

export function FieldShell({ label, error, hint, className, children }: FieldShellProps) {
  const id = useId()
  const errorId = error ? `${id}-error` : undefined
  const hintId = hint ? `${id}-hint` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined
  return (
    <div className={className}>
      <div className={fieldWrap} data-invalid={error ? 'true' : undefined}>
        <label htmlFor={id} className={fieldLabel}>
          {label}
        </label>
        {children({ id, describedBy })}
      </div>
      {hint && !error ? (
        <p id={hintId} className="pt-12 text-small text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="pt-12 text-small text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode
  error?: ReactNode
  hint?: ReactNode
}

/** Prestige/Field: text, email, phone, date, time and number inputs. */
export function Field({ label, error, hint, className, ...input }: FieldProps) {
  return (
    <FieldShell label={label} error={error} hint={hint} className={className}>
      {({ id, describedBy }) => (
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(fieldControl, 'min-h-28')}
          {...input}
        />
      )}
    </FieldShell>
  )
}

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: ReactNode
  error?: ReactNode
  hint?: ReactNode
}

export function TextAreaField({
  label,
  error,
  hint,
  className,
  rows = 3,
  ...textarea
}: TextAreaFieldProps) {
  return (
    <FieldShell label={label} error={error} hint={hint} className={className}>
      {({ id, describedBy }) => (
        <textarea
          id={id}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(fieldControl, 'resize-y')}
          {...textarea}
        />
      )}
    </FieldShell>
  )
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: ReactNode
  error?: ReactNode
  hint?: ReactNode
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

/** Prestige/Field/Select: options come from the CMS. Native select with the Figma chevron. */
export function SelectField({
  label,
  error,
  hint,
  options,
  placeholder,
  className,
  ...select
}: SelectFieldProps) {
  return (
    <FieldShell label={label} error={error} hint={hint} className={className}>
      {({ id, describedBy }) => (
        <div className="relative flex items-center">
          <select
            id={id}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(fieldControl, 'min-h-28 cursor-pointer appearance-none pr-28')}
            {...select}
          >
            {placeholder !== undefined ? <option value="">{placeholder}</option> : null}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <Icon name="chevron-down" size={16} className="pointer-events-none absolute right-0" />
        </div>
      )}
    </FieldShell>
  )
}

export interface ChipProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
  /** Radio for one choice (service), checkbox for several. */
  type?: 'radio' | 'checkbox'
}

/** Prestige/Chip: selectable option. Hover accent, focus 2px ring, selected ink. */
export function Chip({ label, type = 'radio', className, ...input }: ChipProps) {
  return (
    <label
      className={cn(
        'relative inline-flex min-h-44 cursor-pointer items-center justify-center rounded-full border border-border px-20 py-14',
        'text-small whitespace-nowrap text-foreground transition-colors duration-150 ease-out',
        'hover:bg-accent has-[:focus-visible]:border-2 has-[:focus-visible]:border-ring has-[:focus-visible]:px-19',
        'has-[:checked]:border-foreground has-[:checked]:bg-primary has-[:checked]:text-primary-foreground',
        'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-45 has-[:disabled]:hover:bg-transparent',
        className,
      )}
    >
      <input type={type} className="sr-only" {...input} />
      {label}
    </label>
  )
}

export interface StepperProps {
  label: ReactNode
  hint?: ReactNode
  name: string
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  className?: string
}

/** Prestige/Stepper: number input with minus and plus, for guests and bags. */
export function Stepper({
  label,
  hint,
  name,
  value,
  min = 0,
  max = 99,
  onChange,
  className,
}: StepperProps) {
  const id = useId()
  const button = cn(
    'flex size-48 shrink-0 items-center justify-center rounded-full border border-foreground text-body',
    'transition-colors hover:bg-accent disabled:opacity-45 disabled:hover:bg-transparent outline-ring focus-visible:outline-2',
  )
  return (
    <div className={cn('flex items-center gap-16 border-b border-border py-14', className)}>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <label htmlFor={id} className="text-body text-foreground">
          {label}
        </label>
        {hint ? <p className="text-small text-muted-foreground">{hint}</p> : null}
      </div>
      <div className="flex items-center gap-16">
        <button
          type="button"
          className={button}
          aria-label={`Fewer ${typeof label === 'string' ? label.toLowerCase() : ''}`.trim()}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          −
        </button>
        <input
          id={id}
          name={name}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || min)))}
          className="w-24 appearance-none bg-transparent text-center text-h4 text-foreground outline-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          className={button}
          aria-label={`More ${typeof label === 'string' ? label.toLowerCase() : ''}`.trim()}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          +
        </button>
      </div>
    </div>
  )
}

export interface VehicleOptionProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string
  vehicle: ReactNode
  detail?: ReactNode
  /** Optional photo across the top of the card (an <img> or next/image with fill). */
  image?: ReactNode
}

/** Prestige/Vehicle option: selectable vehicle card in the booking form. */
export function VehicleOption({ vehicle, detail, image, className, ...input }: VehicleOptionProps) {
  return (
    <label
      className={cn(
        'group/vehicle relative flex cursor-pointer flex-col gap-4 border border-border bg-background p-20',
        'transition-colors duration-150 hover:border-foreground',
        'has-[:checked]:border-foreground has-[:checked]:bg-card',
        'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring',
        className,
      )}
    >
      {image ? (
        <span className="relative -mx-20 -mt-20 mb-12 block aspect-[16/10] overflow-hidden bg-placeholder">
          <span className="absolute inset-0 block transition-transform duration-700 ease-out group-hover/vehicle:scale-105 motion-reduce:transition-none">
            {image}
          </span>
        </span>
      ) : null}
      <span className="flex items-center gap-12">
        <span className="min-w-0 flex-1 text-body text-foreground">{vehicle}</span>
        <input type="radio" className="sr-only" {...input} />
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
          className="shrink-0"
        >
          <rect
            x="0.75"
            y="0.75"
            width="18.5"
            height="18.5"
            rx="9.25"
            className="stroke-border stroke-1 group-has-[:checked]/vehicle:stroke-brand group-has-[:checked]/vehicle:stroke-[1.5]"
          />
          <circle
            cx="10"
            cy="10"
            r="5"
            className="hidden fill-brand group-has-[:checked]/vehicle:block"
          />
        </svg>
      </span>
      {detail ? <span className="text-small text-muted-foreground">{detail}</span> : null}
    </label>
  )
}
