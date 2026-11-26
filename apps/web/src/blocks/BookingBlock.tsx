import { Header, Section, type BlockHeader } from './shared'

/**
 * Booking form block. The section and header render now; the form itself
 * (Prestige/Booking/Form with CMS-driven options and WhatsApp hand-off) is task 147.
 */
export function BookingBlock({ block }: { block: Record<string, unknown> }) {
  return (
    <Section settings={block.settings as never} className="bg-card">
      <Header header={block.header as BlockHeader} />
      <div id="booking-form" />
    </Section>
  )
}
