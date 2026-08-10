/**
 * The layered gradient wash used by the landing-page sections, so blog routes
 * sit on the same surface as the rest of the site instead of flat white.
 * Render inside a `relative` parent. Deliberately NOT `overflow-hidden`:
 * every layer here is `absolute inset-0` and cannot overflow, and an
 * `overflow` ancestor silently disables `position: sticky` for everything
 * inside it — which is what broke the article rails.
 */
export function BlogBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-linear-to-br from-white via-accent/10 to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(60,87,106,0.07),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(4,43,72,0.05),transparent_45%)]" />
    </div>
  )
}

interface EyebrowProps {
  children: React.ReactNode
}

/** The pill used above section headings on the landing page. */
export function Eyebrow({ children }: EyebrowProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      {children}
    </span>
  )
}
