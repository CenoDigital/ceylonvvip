import type { Form } from '@ceylonvvip/db'
import { cn } from '@ceylonvvip/ui-brand'

import { getCollection, getGlobal, getFirstForm } from '@/lib/data'
import { currentLocale, isRtl, LOCALE_TAGS } from '@/lib/i18n'
import { mediaSrc } from '@/lib/media-url'
import { getUiStrings } from '@/lib/ui-strings'

import type { BookingFormProps } from './BookingForm'
import { BookingFormLazy as BookingForm } from './BookingFormLazy'

import { Header, Section, asMedia, type BlockHeader } from './shared'

/**
 * Form block: Prestige/Booking/Form with its options read live from the CMS, so a newly
 * published service or vehicle appears in every booking form straight away.
 */
export async function BookingBlock({ block }: { block: Record<string, unknown> }) {
  const chosen = block.form && typeof block.form === 'object' ? (block.form as Form) : null
  const [form, services, vehicles, settings, ui] = await Promise.all([
    chosen ?? getFirstForm(),
    getCollection('services'),
    getCollection('vehicles'),
    getGlobal('booking-settings'),
    getUiStrings(),
  ])
  const locale = currentLocale()
  const preselect =
    block.service && typeof block.service === 'object'
      ? (block.service as { id: number }).id
      : block.service

  const props: BookingFormProps | null = form
    ? {
        form: {
          id: form.id,
          serviceLabel: form.serviceLabel,
          vehicleLabel: form.vehicleLabel ?? null,
          noPreferenceLabel: form.noPreferenceLabel ?? null,
          noPreferenceDetail: form.noPreferenceDetail ?? null,
          dateLabel: form.dateLabel,
          timeLabel: form.timeLabel ?? null,
          adultsLabel: form.adultsLabel,
          adultsHint: form.adultsHint ?? null,
          childrenLabel: form.childrenLabel ?? null,
          childrenHint: form.childrenHint ?? null,
          submitLabel: form.submitLabel,
          detailsToggleLabel: form.detailsToggleLabel ?? null,
          note: form.note ?? null,
          consentLabel: form.consentLabel ?? null,
          details: (form.details ?? []).map((d) => ({
            name: d.name,
            label: d.label,
            type: d.type,
            placeholder: d.placeholder ?? null,
            required: Boolean(d.required),
            width: d.width ?? 'full',
            services: (d.services ?? []).map((s) => String(typeof s === 'object' ? s.id : s)),
          })),
        },
        services: (
          services as Array<{ id: number; title: string; shortLabel?: string | null }>
        ).map((s) => ({
          id: String(s.id),
          label: s.shortLabel || s.title,
        })),
        vehicles: (
          vehicles as Array<{
            id: number
            name: string
            seats: number
            luggage?: number | null
            gallery?: unknown[] | null
          }>
        ).map((v) => {
          const photo = asMedia(v.gallery?.[0])
          const src = mediaSrc(photo?.sizes?.card?.url || photo?.url)
          return {
            id: String(v.id),
            name: v.name,
            seats: v.seats,
            luggage: v.luggage ?? null,
            image: src ? { src, alt: photo?.alt || v.name } : null,
          }
        }),
        preselectService: preselect != null ? String(preselect) : null,
        successMessage: settings.successMessage ?? null,
        ui,
        lang: LOCALE_TAGS[locale],
        dir: isRtl(locale) ? 'rtl' : 'ltr',
      }
    : null

  const header = block.header as BlockHeader | undefined
  const hasHeader = Boolean(header?.eyebrow || header?.heading || header?.intro)
  // Figma Booking v2 and 10 Contact: heading on the left (420), the form on the right.
  // On an ivory section the form sits in a parchment card (48 padding); on a parchment
  // section it sits directly on it. Without a heading the form is centred.
  const onCard = (block.settings as { bg?: string } | undefined)?.bg === 'card'
  return (
    <Section settings={block.settings as never}>
      <div
        className={cn(
          'flex w-full flex-col gap-40',
          hasHeader ? 'lg:flex-row lg:items-start lg:justify-between lg:gap-96' : 'items-center',
        )}
      >
        {hasHeader ? (
          <Header header={header} className="lg:sticky lg:top-140 lg:w-420 lg:shrink-0" />
        ) : null}
        <div
          className={cn(
            'w-full lg:max-w-796',
            !onCard && '-mx-24 w-[calc(100%+48px)] bg-card px-24 py-40 sm:mx-0 sm:w-full sm:p-48',
            hasHeader ? 'lg:flex-1' : 'max-w-796',
          )}
        >
          {props ? <BookingForm {...props} /> : null}
        </div>
      </div>
    </Section>
  )
}
