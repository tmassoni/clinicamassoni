import { ButtonHTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 transform active:scale-95 select-none cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-[#042B48] text-white hover:bg-[#042B48]/90 hover:shadow-lg focus:bg-[#042B48]/80 active:bg-[#042B48]/95 disabled:bg-[#042B48]/40 disabled:cursor-not-allowed disabled:transform-none',
        primary:
          'bg-[#042B48] text-white hover:bg-[#042B48]/90 hover:shadow-md focus:bg-[#042B48]/80 active:bg-[#042B48]/95 disabled:bg-[#042B48]/40 disabled:cursor-not-allowed disabled:transform-none',
        secondary:
          'bg-[#3C576A] text-white border border-[#3C576A] hover:bg-[#3C576A]/90 hover:shadow-sm focus:bg-[#3C576A]/80 active:bg-[#3C576A]/95 disabled:bg-[#3C576A]/40 disabled:text-white/50 disabled:border-[#3C576A]/40 disabled:cursor-not-allowed disabled:transform-none',
        subtle:
          'bg-[#042B48]/5 text-[#042B48] border border-[#042B48]/20 hover:bg-[#042B48]/10 hover:border-[#042B48]/30 hover:shadow-sm focus:bg-[#042B48]/10 active:bg-[#042B48]/20 disabled:bg-[#042B48]/5 disabled:opacity-50 disabled:border-[#042B48]/10 disabled:cursor-not-allowed disabled:transform-none',
        outline:
          'border-2 border-[#042B48] text-[#042B48] hover:bg-[#042B48] hover:text-white hover:shadow-sm focus:bg-[#042B48]/10 focus:text-[#042B48] active:bg-[#042B48]/20 disabled:border-[#042B48]/30 disabled:text-[#042B48]/30 disabled:cursor-not-allowed disabled:transform-none',
        ghost:
          'text-[#042B48] hover:bg-neutral-100 hover:shadow-sm focus:bg-neutral-100 active:bg-neutral-200 disabled:text-[#042B48]/40 disabled:cursor-not-allowed disabled:transform-none',
        link: 'text-[#042B48] hover:text-[#042B48]/80 underline-offset-4 hover:underline transition-colors font-medium disabled:text-[#042B48]/40 disabled:cursor-not-allowed bg-transparent border-none rounded-none p-0 h-auto transform-none hover:transform-none active:transform-none',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 hover:shadow-md focus:bg-red-700 active:bg-red-800 disabled:bg-red-300 disabled:cursor-not-allowed disabled:transform-none',
      },
      size: {
        default: 'h-10 px-6 py-3',
        sm: 'h-8 px-4 py-2 text-xs',
        lg: 'h-12 px-8 py-4 text-lg',
        xl: 'h-14 px-10 py-5 text-xl',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
