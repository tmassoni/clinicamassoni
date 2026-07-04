'use client'

import { useRef } from 'react'
import type {
  ComponentProps,
  MouseEventHandler,
  PointerEventHandler,
} from 'react'
import { LinkButton } from '@/app/src/components/custom/LinkButton'
import {
  trackCtaClick,
  type CtaChannel,
  type CtaLocation,
  type CtaSection,
} from '@/app/src/lib/analytics'

interface TrackedLinkButtonProps extends ComponentProps<typeof LinkButton> {
  channel: CtaChannel
  section: CtaSection
  label: string
  location?: CtaLocation
}

export function TrackedLinkButton({
  href,
  channel,
  section,
  label,
  location = 'global',
  onClick,
  onPointerDown,
  ...props
}: TrackedLinkButtonProps) {
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

  return (
    <LinkButton
      href={href}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      {...props}
    />
  )
}
