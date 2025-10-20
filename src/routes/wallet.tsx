import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { IconBadge } from '@/components/ui/IconBadge'
import { useApp } from '@/context/AppContext'
import { Plus } from 'lucide-react'

export default function Wallet() {
  const navigate = useNavigate()
  const { goals } = useApp()

  return (
    <div className="space-y-4">
      <Card variant="gradient" className="p-4">
        <p className="text-neutral-700">Wallet Balance</p>
        <p className="text-3xl font-bold">$ 2,000</p>
        <Button 
          className="mt-4 rounded-xl px-4 py-2 text-white bg-gradient-to-r from-pink-300 to-green-300 hover:from-pink-400 hover:to-green-400"
        >
          Top Up
        </Button>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Goals</h2>
        <button 
          className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
          onClick={() => navigate('/goals/new')}
        >
          <div className="flex items-center gap-1">
            <Plus size={16} />
            Add Goal
          </div>
        </button>
      </div>
      <div className="space-y-3">
        {goals.map((goal) => (
          <Card 
            key={goal.id} 
            className="p-3 cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => navigate(`/goals/${goal.id}`)}
          >
            <div className="flex items-center gap-3">
              <IconBadge icon={goal.icon} variant="success" size="lg" />
              <div className="flex-1">
                <p className="font-medium">{goal.name}</p>
                <ProgressBar 
                  value={goal.current} 
                  max={goal.target} 
                  variant="success" 
                  showLabel 
                  className="mt-2"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


