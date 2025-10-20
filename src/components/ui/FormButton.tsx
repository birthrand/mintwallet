import React from 'react'
import { cn } from '@/lib/utils'

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className, children, ...props }, ref) => {
    const baseClasses = "font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    
    const variantClasses = {
      primary: "bg-gradient-to-r from-pink-400 to-green-400 text-white hover:from-pink-500 hover:to-green-500 focus:ring-pink-200 shadow-lg",
      secondary: "bg-white border-2 border-neutral-200 text-neutral-700 hover:bg-neutral-50 focus:ring-neutral-200",
      danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-200 shadow-lg"
    }
    
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Loading...
          </div>
        ) : (
          children
        )}
      </button>
    )
  }
)

FormButton.displayName = "FormButton"

export { FormButton }
