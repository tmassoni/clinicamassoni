import type { LucideIcon } from 'lucide-react'

interface ProcedureCardProps {
  icon: LucideIcon
  text: string
}

export const ProcedureCard = ({ icon: Icon, text }: ProcedureCardProps) => {
  return (
    <div className="group relative bg-gradient-to-br from-bg-subtle to-white p-4 rounded-2xl border border-border-subtle hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base font-medium text-secondary group-hover:text-primary transition-colors">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}
