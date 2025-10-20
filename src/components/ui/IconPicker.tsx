import React from 'react'
import { cn } from '@/lib/utils'

interface IconPickerProps {
  selectedIcon: string
  onIconSelect: (icon: string) => void
  className?: string
}

const commonIcons = [
  '💰', '💳', '🏠', '🍔', '🚗', '⛽', '🛒', '🎬', '☕', '🍕',
  '📱', '💊', '⚡', '💧', '📺', '🎮', '👕', '👟', '💄', '📚',
  '✈️', '🏨', '🍽️', '🎵', '🎨', '🏋️', '🧘', '🎯', '💡', '🔧',
  '📦', '🎁', '💐', '🌹', '🎂', '🍰', '🍷', '🍺', '🥤', '🍪'
]

const IconPicker: React.FC<IconPickerProps> = ({ selectedIcon, onIconSelect, className }) => {
  return (
    <div className={cn("space-y-3", className)}>
      <label className="text-sm font-medium text-neutral-700">Choose an icon</label>
      <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto">
        {commonIcons.map((icon) => (
          <button
            key={icon}
            onClick={() => onIconSelect(icon)}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all duration-200 hover:scale-110",
              selectedIcon === icon
                ? "bg-gradient-to-r from-pink-200 to-green-200 border-2 border-pink-400 shadow-lg"
                : "bg-white/70 border border-neutral-200 hover:bg-neutral-50"
            )}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  )
}

export { IconPicker }
