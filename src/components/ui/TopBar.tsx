import * as React from "react"
import { Button } from "@/components/ui/button"
import { Filter, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface TopBarProps {
  title: string
  showFilter?: boolean
  showAdd?: boolean
  onFilterClick?: () => void
  onAddClick?: () => void
  leftIcon?: React.ReactElement
  onLeftClick?: () => void
  rightIcon?: React.ReactElement
  onRightClick?: () => void
  rightLabel?: string
  className?: string
}

const TopBar = React.forwardRef<HTMLDivElement, TopBarProps>(
  ({ 
    title, 
    showFilter = false, 
    showAdd = false, 
    onFilterClick, 
    onAddClick, 
    leftIcon, 
    onLeftClick, 
    rightIcon, 
    onRightClick, 
    rightLabel,
    className, 
    ...props 
  }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("flex items-center justify-between", className)} 
        {...props}
      >
        <div className="flex items-center gap-3">
          {leftIcon && (
            <button
              onClick={onLeftClick}
              className="p-1 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
            >
              {leftIcon}
            </button>
          )}
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {showFilter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onFilterClick}
              className="rounded-xl"
            >
              <Filter size={16} className="mr-1" />
              Filter
            </Button>
          )}
          {showAdd && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAddClick}
              className="rounded-xl"
            >
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          )}
          {rightIcon && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRightClick}
              className="rounded-xl"
            >
              {rightIcon}
              {rightLabel && <span className="ml-1">{rightLabel}</span>}
            </Button>
          )}
        </div>
      </div>
    )
  }
)
TopBar.displayName = "TopBar"

export { TopBar }
