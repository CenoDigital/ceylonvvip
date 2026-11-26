'use client'

import { useState } from 'react'

import {
  Button,
  Icon,
  LanguageLabel,
  MobileBar,
  MobileMenu,
  SiteNav,
  type NavLink,
} from '@ceylonvvip/ui-brand'

export interface HeaderData {
  left: NavLink[]
  right: NavLink[]
  /** Every link in order, for the mobile menu. */
  all: NavLink[]
  concierge?: NavLink & { external?: boolean }
  language?: string
  siteName: string
  menuNote?: string
  bar: Array<{ label: string; icon?: string; href?: string; menu?: boolean }>
}

/** Nav, mobile menu and mobile thumb bar: one client island sharing the menu state. */
export function Header({ data }: { data: HeaderData }) {
  const [open, setOpen] = useState(false)
  const external = data.concierge?.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <>
      <SiteNav
        left={data.left}
        right={data.right}
        action={data.concierge}
        wordmark={data.siteName}
        language={data.language ? <LanguageLabel code={data.language} /> : undefined}
        menuButton={
          <button
            type="button"
            aria-label="Open the menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex size-44 items-center justify-end"
          >
            <Icon name="menu" size={22} />
          </button>
        }
      />
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        links={data.all}
        wordmark={data.siteName}
        note={data.menuNote}
        action={
          data.concierge ? (
            <Button href={data.concierge.href} {...external}>
              {data.concierge.label}
            </Button>
          ) : undefined
        }
      />
      {data.bar.length ? (
        <MobileBar
          onOpenMenu={() => setOpen(true)}
          items={data.bar.map((b) => ({
            label: b.label,
            icon: b.icon as never,
            href: b.href,
            onMenu: b.menu,
          }))}
        />
      ) : null}
    </>
  )
}
