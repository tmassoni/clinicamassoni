'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Puts the reader at the top of the page when the route changes.
 *
 * The bug this fixes: `html { scroll-behavior: smooth }` makes Next's own
 * scroll-to-top animate, and Next fires it against the *outgoing* document's
 * height. Navigating from 2019px down an article landed you at 2801px on the
 * new page — further down than you started, on content you had never seen.
 *
 * The fix is to take scrolling out of the router's hands for the transition:
 * force `scroll-behavior: auto`, jump to the top, and hold it for a frame so
 * the router's late scroll cannot drag it back down. Then restore `smooth`,
 * which is what in-page anchors rely on.
 *
 * **On why this jumps rather than animates.** An animated scroll-to-top was
 * tried and measured. Because the router scrolls on its own frame, the result
 * was a visible flash — 2500 → 6697 → 0 → 2500 — before the animation even
 * began. Making it smooth cleanly would mean `scroll={false}` on all 34
 * internal links, and every link added afterwards remembering to do the same.
 * A jump has no artifact and matches what the reader expects when the page
 * changes. See the note in the PR if that trade-off should be revisited.
 *
 * Deliberately left alone:
 * - **Reloads.** The browser's `scrollRestoration` keeps your place, and the
 *   first render never triggers this.
 * - **Links carrying a hash.** `/blog/x#faq` should land on the anchor.
 */
export function RouteScrollToTop() {
  const pathname = usePathname()
  const previousPathname = useRef<string | null>(null)
  const navigatedWithHash = useRef(false)

  // Capture phase, so it records intent before the router reacts.
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a')
      const href = anchor?.getAttribute('href')
      if (!href) return
      navigatedWithHash.current = href.includes('#')
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  useLayoutEffect(() => {
    if (previousPathname.current === null) {
      previousPathname.current = pathname
      return
    }
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname

    if (navigatedWithHash.current || window.location.hash) return

    const root = document.documentElement
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)

    // The router's scroll arrives a frame later; hold the top through it.
    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      root.style.scrollBehavior = ''
    })

    return () => {
      cancelAnimationFrame(frame)
      root.style.scrollBehavior = ''
    }
  }, [pathname])

  return null
}
