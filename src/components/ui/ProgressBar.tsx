import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, max = 100, variant = 'default', size = 'md', showLabel = false, className, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    // const variantClasses = {
    //   default: "bg-neutral-200",
    //   success: "bg-green-500",
    //   warning: "bg-yellow-500", 
    //   danger: "bg-red-500"
    // }
    
    const sizeClasses = {
      sm: "h-1",
      md: "h-2", 
      lg: "h-3"
    }

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {showLabel && (
          <div className="flex justify-between text-xs text-neutral-600 mb-1">
            <span>{value} / {max}</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
        <Progress 
          value={percentage} 
          className={cn(sizeClasses[size], "bg-neutral-100")}
        />
      </div>
    )
  }
)
ProgressBar.displayName = "ProgressBar"

export { ProgressBar }
