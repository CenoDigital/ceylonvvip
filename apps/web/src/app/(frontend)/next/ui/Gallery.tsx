'use client'

import { useState } from 'react'

import {
  Alert,
  BannerResume,
  Button,
  Chip,
  Enquiry,
  FaqRow,
  Feature,
  FeatureSignature,
  Field,
  IndexRow,
  LanguageLabel,
  LegalSection,
  LinkUnderline,
  MobileBar,
  NextLink,
  PageHero,
  RouteRow,
  SectionHeader,
  SelectField,
  SiteFooter,
  SiteNav,
  Spec,
  Step,
  Stepper,
  Toast,
  VehicleOption,
  Icon,
} from '@ceylonvvip/ui-brand'

// Sample content is Figma's own placeholder copy, so the gallery can be compared with
// the design side by side. Real copy comes from the CMS.
const block = 'border-b border-border px-24 py-48 lg:px-64'

export function Gallery() {
  const [adults, setAdults] = useState(2)
  return (
    <main className="pb-120">
      <SiteNav
        left={[
          { label: 'Services', href: '#' },
          { label: 'Fleet', href: '#' },
          { label: 'Journeys', href: '#' },
        ]}
        right={[
          { label: 'About', href: '#' },
          { label: 'Contact', href: '#' },
        ]}
        language={<LanguageLabel code="EN" />}
        action={{ label: 'Concierge', href: '#' }}
        menuButton={
          <button type="button" aria-label="Menu" className="flex size-44 items-center justify-end">
            <Icon name="menu" size={22} />
          </button>
        }
      />

      <PageHero
        label="Services, 02"
        title={'Island tours,\nmade around you.'}
        text="Short introduction to the page in one or two calm sentences."
        action={<LinkUnderline href="#">Concierge</LinkUnderline>}
      />

      <section className={block} data-testid="actions">
        <div className="flex flex-wrap items-center gap-32">
          <Button>Speak to your concierge</Button>
          <Button disabled>Speak to your concierge</Button>
          <LinkUnderline href="#">Concierge</LinkUnderline>
        </div>
      </section>

      <section className={block}>
        <SectionHeader label="Services" title="Every journey, arranged privately." />
        <div className="mt-48">
          <IndexRow
            number="01"
            title="Airport Transfers"
            note="From CMB to anywhere on the island"
            href="#"
          />
          <IndexRow number="02" title="Island Tours" note="Private tours at your pace" href="#" />
        </div>
      </section>

      <section className={block}>
        <div className="grid gap-32 lg:grid-cols-3">
          <Feature
            variant="large"
            title="Met at arrivals"
            text="Your driver waits at arrivals with your name, and helps with your luggage."
          />
          <Feature
            variant="small"
            title="Sri Lankan gems"
            text="Natural gems, cut and polished or rough, to experience during your stay."
          />
          <Feature variant="title" title="Hot fresh towels" />
        </div>
      </section>

      <FeatureSignature
        label="Signature experience"
        title="A real Sri Lankan gem, in your hands."
        text="Short description of the benefit in two calm sentences."
        action={<LinkUnderline href="#">Concierge</LinkUnderline>}
      />

      <section className={block}>
        <ol className="grid gap-x-48 lg:grid-cols-2">
          <Step
            number="01"
            title="Before you fly"
            text="Send your flight number. Driver, vehicle and quote are confirmed in writing."
          />
          <Step number="02" title="On arrival" text="Your driver meets you at arrivals." />
        </ol>
      </section>

      <section className={block}>
        <ul>
          <RouteRow route="Airport to Colombo" note="Price on request" />
          <RouteRow route="Airport to Galle" note="Price on request" active />
        </ul>
        <dl className="mt-48 grid grid-cols-2 gap-24 lg:grid-cols-4">
          <Spec label="Best for" value="Airport transfers, weddings and couples" />
          <Spec label="Guests" value="Up to 3" />
        </dl>
      </section>

      <section className={block}>
        <FaqRow
          question="What if my flight is delayed?"
          answer="There is no charge. We track your flight, and waiting time is free."
          open
        />
        <FaqRow question="Can I book for someone else?" answer="Yes." />
      </section>

      <section className={`${block} bg-card`}>
        <div className="grid max-w-720 gap-32 lg:grid-cols-2">
          <Field label="Name" placeholder="Alexander Perera" autoComplete="name" />
          <Field label="Date" type="date" error="Choose the date of your journey." />
          <SelectField
            label="Service"
            options={[
              { value: 'airport', label: 'Airport Transfer' },
              { value: 'tour', label: 'Island Tour' },
            ]}
          />
          <Field label="Disabled" disabled defaultValue="Alexander Perera" />
        </div>
        <div className="mt-32 flex flex-wrap gap-12">
          <Chip name="service" label="Airport Transfer" defaultChecked />
          <Chip name="service" label="Island Tour" />
          <Chip name="service" label="Elder Care" disabled />
        </div>
        <div className="mt-32 grid max-w-720 gap-12 lg:grid-cols-2">
          <VehicleOption
            name="vehicle"
            vehicle="BMW 520d"
            detail="Up to 3 guests, 4 bags"
            defaultChecked
          />
          <VehicleOption
            name="vehicle"
            vehicle="Mercedes V-Class"
            detail="Up to 6 guests, 6 bags"
          />
        </div>
        <Stepper
          className="mt-32 max-w-342"
          label="Adults"
          hint="Age 12 and over"
          name="adults"
          value={adults}
          min={1}
          onChange={setAdults}
        />
        <div className="mt-32 grid max-w-342 gap-16">
          <BannerResume
            summary="Airport Transfer, 14 December, 2 adults"
            actions={
              <>
                <LinkUnderline href="#">Continue</LinkUnderline>
                <button type="button" className="text-small text-muted-foreground">
                  Start again
                </button>
              </>
            }
          />
          <Alert title="Two answers are missing" text="They are marked in red below." />
          <Toast message="Message copied" />
        </div>
      </section>

      <section className={block}>
        <LegalSection number="01" title="Who we are">
          Body text of the section.
        </LegalSection>
      </section>

      <NextLink href="#" number="03" title="Wedding and Honeymoon" />

      <Enquiry
        label="Private enquiries"
        title={'Tell us where\nyou wish to go.'}
        text="Your travel manager replies quickly, any time of day, and confirms every detail in writing."
        action={<Button href="#">Speak to your concierge</Button>}
        aside="or call +94 77 953 2747"
      />

      <SiteFooter
        tagline={'Travel like royalty,\nfeel like family.'}
        columns={[
          {
            heading: 'Services',
            items: ['Airport Transfers', 'Island Tours', 'Wedding and Honeymoon'].map((label) => ({
              label,
              href: '#',
            })),
          },
          { heading: 'CeylonVVIP', desktopOnly: true, items: [{ label: 'Fleet', href: '#' }] },
          {
            heading: 'Contact',
            items: [{ label: 'Available 24 hours' }, { label: '+94 77 953 2747' }],
          },
        ]}
        copyright="2026 CeylonVVIP. Gainbuild (Pvt) Ltd."
        legal={[
          { label: 'Privacy', href: '#' },
          { label: 'Terms and cancellation', href: '#' },
        ]}
        credit={{ label: 'Designed and developed by CenoDigital', href: 'https://cenodigital.com' }}
      />

      <MobileBar
        items={[
          { label: 'Menu', icon: 'menu', onMenu: true },
          { label: 'Concierge', icon: 'whatsapp', href: '#' },
        ]}
      />
    </main>
  )
}
