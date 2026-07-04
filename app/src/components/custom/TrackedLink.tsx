'use client'

import { useRef } from 'react'
import type {
  AnchorHTMLAttributes,
  MouseEventHandler,
  PointerEventHandler,
} from 'react'
import {
  trackCtaClick,
  type CtaChannel,
  type CtaLocation,
  type CtaSection,
} from '@/app/src/lib/analytics'

interface TrackedLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  channel: CtaChannel
  section: CtaSection
  label: string
  location?: CtaLocation
  external?: boolean
  newTab?: boolean
}

export function TrackedLink({
  href,
  channel,
  section,
  label,
  location = 'global',
  external = false,
  newTab = false,
  target,
  rel,
  onClick,
  onPointerDown,
  ...props
}: TrackedLinkProps) {
  const lastTrackTimeRef = useRef(0)

  const trackOnce = () => {
    const now = Date.now()
    if (now - lastTrackTimeRef.current < 500) return
    lastTrackTimeRef.current = now

    trackCtaClick({
      channel,
      section,
      label,
      href,
      location,
    })
  }

  const handlePointerDown: PointerEventHandler<HTMLAnchorElement> = (event) => {
    trackOnce()
    onPointerDown?.(event)
  }

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    trackOnce()
    onClick?.(event)
  }

  const relTokens = new Set((rel ?? '').split(' ').filter(Boolean))
  if (external || newTab) {
    relTokens.add('noopener')
    relTokens.add('noreferrer')
  }

  const resolvedRel = relTokens.size > 0 ? Array.from(relTokens).join(' ') : undefined

  return (
    <a
      href={href}
      target={newTab ? '_blank' : target}
      rel={resolvedRel}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      {...props}
    />
  )
}
