import type { Form } from '@ceylonvvip/db'

import { getCollection, getGlobal, getFirstForm } from '@/lib/data'

import { BookingForm, type BookingFormProps } from './BookingForm'
import { Header, Section, type BlockHeader } from './shared'

/**
 * Form block: Prestige/Booking/Form with its options read live from the CMS, so a newly
 * published service or vehicle appears in every booking form straight away.
 */
export async function BookingBlock({ block }: { block: Record<string, unknown> }) {
  const chosen = block.form && typeof block.form === 'object' ? (block.form as Form) : null
  const [form, services, vehicles, settings] = await Promise.all([
    chosen ?? getFirstForm(),
    getCollection('services'),
    getCollection('vehicles'),
    getGlobal('booking-settings'),
  ])
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
          vehicles as Array<{ id: number; name: string; seats: number; luggage?: number | null }>
        ).map((v) => ({
          id: String(v.id),
          name: v.name,
          seats: v.seats,
          luggage: v.luggage ?? null,
        })),
        preselectService: preselect != null ? String(preselect) : null,
        successMessage: settings.successMessage ?? null,
      }
    : null

  return (
    <Section settings={block.settings as never}>
      <div className="flex flex-col gap-40 lg:flex-row lg:items-start lg:gap-96">
        <Header header={block.header as BlockHeader} className="lg:w-420 lg:shrink-0" />
        <div className="min-w-0 flex-1 lg:max-w-720">
          {props ? <BookingForm {...props} /> : null}
        </div>
      </div>
    </Section>
  )
}
