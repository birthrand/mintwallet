import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Avatar } from "@/shared/Avatar"
import { Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  name?: string
  greeting?: string
  showNotifications?: boolean
  className?: string
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ name = "Habiba", greeting = "Hi", showNotifications = true, className, ...props }, ref) => {
    const navigate = useNavigate()
    
    return (
      <header 
        ref={ref} 
        className={cn("flex items-center justify-between", className)} 
        {...props}
      >
        <div>
          <p className="text-sm text-neutral-500">{greeting}, {name}!</p>
          <h1 className="text-xl font-semibold">Welcome back</h1>
        </div>
        <div className="flex items-center gap-3">
          {showNotifications && (
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 hover:bg-neutral-100 rounded-xl transition-colors duration-200"
            >
              <Bell size={20} className="text-neutral-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </button>
          )}
          <button
            onClick={() => navigate('/profile')}
            className="hover:scale-105 transition-transform duration-200"
          >
            <Avatar />
          </button>
        </div>
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header }
