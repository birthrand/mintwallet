import * as React from "react"
import { ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

interface ChartProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  height?: number
  className?: string
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ children, title, subtitle, height = 200, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {(title || subtitle) && (
          <div className="mb-4">
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
          </div>
        )}
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
)
Chart.displayName = "Chart"

export { Chart }
