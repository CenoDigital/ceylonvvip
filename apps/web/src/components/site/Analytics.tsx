'use client'

import Script from 'next/script'
import { useSyncExternalStore } from 'react'

/** Name of the cookie a consent banner sets to "granted" once the visitor agrees. */
export const CONSENT_COOKIE = 'cvvip-consent'

const subscribe = (onChange: () => void) => {
  window.addEventListener('cvvip:consent', onChange)
  return () => window.removeEventListener('cvvip:consent', onChange)
}

const consented = () => document.cookie.split('; ').some((c) => c === `${CONSENT_COOKIE}=granted`)

/**
 * GA4 and the Meta Pixel, with IDs from SEO Defaults. Nothing loads unless the visitor
 * has agreed (the consent cookie). Listens for a "cvvip:consent" event so tracking
 * starts as soon as they agree, without a reload.
 */
export function Analytics({ ga4, metaPixel }: { ga4?: string | null; metaPixel?: string | null }) {
  const allowed = useSyncExternalStore(subscribe, consented, () => false)

  if (!allowed) return null
  const safe = (id: string) => id.replace(/[^\w-]/g, '')
  return (
    <>
      {ga4 ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${safe(ga4)}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${safe(ga4)}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {metaPixel ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${safe(metaPixel)}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  )
}
