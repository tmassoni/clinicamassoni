import Link from 'next/link'
import { ArrowUpRight, type LucideIcon } from 'lucide-react'

interface ProcedureCardProps {
  icon: LucideIcon
  text: string
  /**
   * Where this procedure is explained in full. Omit only when nothing on the
   * site covers it — a card that names a service and goes nowhere wastes the
   * strongest internal link the landing page has.
   */
  href?: string
}

export const ProcedureCard = ({ icon: Icon, text, href }: ProcedureCardProps) => {
  const content = (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm sm:text-base font-medium text-secondary group-hover:text-primary transition-colors">
          {text}
        </p>
      </div>
      {href && (
        <ArrowUpRight
          aria-hidden="true"
          className="w-4 h-4 shrink-0 text-primary/40 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </div>
  )

  const className =
    'group relative block bg-gradient-to-br from-bg-subtle to-white p-4 rounded-2xl border border-border-subtle hover:border-primary/30 hover:shadow-lg transition-all duration-300'

  if (!href) return <div className={className}>{content}</div>

  return (
    <Link
      href={href}
      className={`${className} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary`}
    >
      {content}
    </Link>
  )
}
