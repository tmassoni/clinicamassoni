'use client'

import { track } from '@vercel/analytics'

export type CtaChannel = 'whatsapp' | 'phone'
export type CtaSection =
  | 'header'
  | 'hero'
  | 'services'
  | 'contact'
  | 'footer'
  | 'blog'
export type CtaLocation = 'cascavel' | 'global'

export interface CtaClickInput {
  channel: CtaChannel
  section: CtaSection
  label: string
  href: string
  location?: CtaLocation
}

export function trackCtaClick(input: CtaClickInput) {
  track('cta_click', {
    channel: input.channel,
    section: input.section,
    label: input.label,
    href: input.href,
    location: input.location ?? 'global',
    path: window.location.pathname,
  })
}
