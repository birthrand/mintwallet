import * as React from "react"
import { cn } from "@/lib/utils"

interface IconBadgeProps {
  icon: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const IconBadge = React.forwardRef<HTMLDivElement, IconBadgeProps>(
  ({ icon, variant = 'default', size = 'md', className, ...props }, ref) => {
    const variantClasses = {
      default: "bg-neutral-100 text-neutral-600",
      success: "bg-green-100 text-green-600",
      warning: "bg-yellow-100 text-yellow-600",
      danger: "bg-red-100 text-red-600",
      info: "bg-blue-100 text-blue-600"
    }
    
    const sizeClasses = {
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl flex items-center justify-center",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {icon}
      </div>
    )
  }
)
IconBadge.displayName = "IconBadge"

export { IconBadge }
