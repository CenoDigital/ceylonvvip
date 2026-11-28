'use client'

import * as Popover from '@radix-ui/react-popover'
import { useState, type ReactNode } from 'react'
import { DayPicker } from 'react-day-picker'
import { ar, de, fr, ru } from 'react-day-picker/locale'

import { Icon } from '../icons/Icon'
import { cn } from '../lib/cn'
import { FieldShell, fieldControl } from './form'

/*
 * Date and time pickers in the Prestige style (shadcn pattern: a popover over the
 * field). They replace the browser's own pickers, which look different in every
 * browser and break the design. Values stay plain strings ("2026-12-14", "06:40") so
 * validation and the WhatsApp message are unchanged.
 */

const panel = cn(
  'z-50 border border-border bg-background p-20 text-foreground shadow-[0_24px_48px_-24px_rgba(26,22,18,0.35)]',
  'data-[state=open]:animate-[picker-in_180ms_var(--ease-power2-out)]',
  'focus:outline-none',
)

const trigger = cn(
  fieldControl,
  'flex min-h-28 cursor-pointer items-center justify-between gap-12 text-left',
  'focus-visible:outline-none',
)

// Month and day names in the calendar for each site language (English is the default).
const CALENDAR_LOCALES: Record<string, typeof de> = { de, fr, ru, ar }

/** "2026-12-14" as a local date (no time zone shift). */
function parseDate(value: string): Date | undefined {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : undefined
}

const toValue = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/**
 * "Saturday 14 December 2026", as in Figma (no comma after the day name). Other
 * languages use their own long date format.
 */
export const formatDateLong = (value: string, lang = 'en-GB') => {
  const d = parseDate(value)
  if (!d) return ''
  if (!lang.startsWith('en')) {
    return d.toLocaleDateString(lang, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }
  const part = (o: Intl.DateTimeFormatOptions) => d.toLocaleDateString('en-GB', o)
  return `${part({ weekday: 'long' })} ${d.getDate()} ${part({ month: 'long' })} ${d.getFullYear()}`
}

interface PickerBase {
  label: ReactNode
  value: string
  onChange: (value: string) => void
  error?: ReactNode
  hint?: ReactNode
  placeholder?: string
  required?: boolean
  className?: string
}

export interface DateFieldProps extends PickerBase {
  /** Earliest date that can be chosen, "YYYY-MM-DD". */
  min?: string
  /** BCP 47 language for the date text, like "de". */
  lang?: string
  dir?: 'ltr' | 'rtl'
}

/** Prestige/Field with a calendar: opens below the field, closes on choice. */
export function DateField({
  label,
  value,
  onChange,
  min,
  error,
  hint,
  placeholder = 'Select a date',
  required,
  className,
  lang,
  dir,
}: DateFieldProps) {
  const calendarLocale = lang ? CALENDAR_LOCALES[lang.slice(0, 2)] : undefined
  const [open, setOpen] = useState(false)
  const selected = parseDate(value)
  const earliest = min ? parseDate(min) : undefined
  return (
    <FieldShell label={label} error={error} hint={hint} className={className}>
      {({ id, describedBy }) => (
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger
            id={id}
            type="button"
            aria-describedby={describedBy}
            aria-haspopup="dialog"
            className={trigger}
          >
            <span className={cn(!value && 'text-muted-foreground')}>
              {value ? formatDateLong(value, lang) : placeholder}
            </span>
            {required ? <span className="sr-only">, required</span> : null}
            <Icon name="calendar" size={18} className="shrink-0 text-muted-foreground" />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              align="start"
              sideOffset={12}
              collisionPadding={16}
              className={panel}
              aria-label="Choose a date"
            >
              <DayPicker
                mode="single"
                selected={selected}
                defaultMonth={selected ?? earliest}
                startMonth={earliest}
                disabled={earliest ? { before: earliest } : undefined}
                weekStartsOn={1}
                locale={calendarLocale}
                dir={dir}
                autoFocus
                onSelect={(d) => {
                  if (!d) return
                  onChange(toValue(d))
                  setOpen(false)
                }}
                components={{
                  Chevron: ({ orientation }) => (
                    <Icon
                      name={
                        (orientation === 'left') !== (dir === 'rtl') ? 'arrow-left' : 'arrow-right'
                      }
                      size={16}
                    />
                  ),
                }}
                classNames={{
                  root: 'relative',
                  months: 'flex flex-col',
                  month: 'flex flex-col gap-16',
                  month_caption: 'flex h-40 items-center',
                  caption_label: 'font-display text-h4 text-foreground',
                  nav: 'absolute top-0 right-0 flex gap-4',
                  button_previous: navButton,
                  button_next: navButton,
                  month_grid: 'border-collapse',
                  weekdays: 'flex',
                  weekday: 'size-40 text-center text-label-caps leading-40 text-muted-foreground',
                  week: 'flex',
                  day: 'size-40 p-0 text-center',
                  day_button: cn(
                    'size-40 cursor-pointer rounded-full text-small tabular-nums text-foreground',
                    'transition-colors duration-150 hover:bg-accent',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  ),
                  today:
                    '[&>button]:font-medium [&>button]:underline [&>button]:underline-offset-4',
                  selected:
                    '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary',
                  outside: '[&>button]:text-muted-foreground/50',
                  disabled:
                    '[&>button]:cursor-not-allowed [&>button]:text-muted-foreground/40 [&>button]:hover:bg-transparent',
                  hidden: 'invisible',
                }}
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
    </FieldShell>
  )
}

const navButton = cn(
  'inline-flex size-40 cursor-pointer items-center justify-center rounded-full border border-border',
  'transition-colors duration-150 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-35',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
)

const HOURS = Array.from({ length: 24 }, (_, h) => String(h).padStart(2, '0'))
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'))

export interface TimeFieldProps extends PickerBase {
  /** Minutes between choices (default 5). */
  step?: number
  /** Translated labels for the panel. */
  labels?: { hour?: string; minute?: string; clear?: string; done?: string }
}

/** Prestige/Field with hour and minute columns; 24-hour, as Sri Lanka writes times. */
export function TimeField({
  label,
  value,
  onChange,
  error,
  hint,
  placeholder = 'Select a time',
  required,
  className,
  labels = {},
}: TimeFieldProps) {
  const [open, setOpen] = useState(false)
  const [hour = '', minute = ''] = /^\d{2}:\d{2}$/.test(value) ? value.split(':') : []
  const pick = (h: string, m: string) => onChange(`${h || '09'}:${m || '00'}`)
  const option = (on: boolean) =>
    cn(
      'flex h-40 w-56 shrink-0 cursor-pointer items-center justify-center rounded-full text-small tabular-nums',
      'transition-colors duration-150',
      on ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    )
  return (
    <FieldShell label={label} error={error} hint={hint} className={className}>
      {({ id, describedBy }) => (
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger
            id={id}
            type="button"
            aria-describedby={describedBy}
            aria-haspopup="dialog"
            className={trigger}
          >
            <span className={cn('tabular-nums', !value && 'text-muted-foreground')}>
              {value || placeholder}
            </span>
            {required ? <span className="sr-only">, required</span> : null}
            <Icon name="clock" size={18} className="shrink-0 text-muted-foreground" />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              align="start"
              sideOffset={12}
              collisionPadding={16}
              className={cn(panel, 'w-[min(296px,calc(100vw-32px))]')}
              aria-label="Choose a time"
            >
              <div className="grid grid-cols-2 gap-16">
                {(
                  [
                    ['Hour', labels.hour ?? 'Hour', HOURS, hour, (h: string) => pick(h, minute)],
                    [
                      'Minute',
                      labels.minute ?? 'Minute',
                      MINUTES,
                      minute,
                      (m: string) => pick(hour, m),
                    ],
                  ] as const
                ).map(([name, title, list, current, choose]) => (
                  <div key={name} className="flex min-w-0 flex-col items-center gap-8">
                    <p className="text-label-caps text-muted-foreground">{title}</p>
                    <div
                      role="listbox"
                      aria-label={title}
                      className="relative flex max-h-240 w-full flex-col [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-center gap-2 overflow-y-auto overscroll-contain"
                    >
                      {list.map((v) => (
                        <button
                          key={v}
                          type="button"
                          role="option"
                          aria-selected={current === v}
                          className={option(current === v)}
                          ref={(el) => {
                            // Centre the chosen value in its column (not the page).
                            const list = el?.parentElement
                            // Nothing chosen yet: open at 09:00, a common pick-up time.
                            const anchor = current || (name === 'Hour' ? '09' : '00')
                            if (el && list && anchor === v)
                              list.scrollTop =
                                el.offsetTop - list.clientHeight / 2 + el.clientHeight / 2
                          }}
                          onClick={() => choose(v)}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-16 flex items-center justify-between border-t border-border pt-16">
                <button
                  type="button"
                  className="cursor-pointer text-small text-muted-foreground underline-offset-4 hover:underline"
                  onClick={() => onChange('')}
                >
                  {labels.clear ?? 'Clear'}
                </button>
                <Popover.Close className="cursor-pointer text-label-caps text-foreground underline underline-offset-4">
                  {labels.done ?? 'Done'}
                </Popover.Close>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
    </FieldShell>
  )
}
