import { useNavigate } from 'react-router-dom'
import { Area, AreaChart, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { IconBadge } from '@/components/ui/IconBadge'
import { Chart } from '@/components/ui/Chart'
import { useApp } from '@/context/AppContext'
import { Plus } from 'lucide-react'

export default function Budget() {
  const navigate = useNavigate()
  const { budgets, incomeChartData } = useApp()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Budget</h1>
        <button 
          className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
          onClick={() => navigate('/budgets/new')}
        >
          <div className="flex items-center gap-1">
            <Plus size={16} />
            Add Budget
          </div>
        </button>
      </div>
      
      <Card className="p-3 h-52">
        <Chart height={200}>
          <AreaChart data={incomeChartData} margin={{ left: -20, right: 0, top: 10, bottom: 0 }}>
            <XAxis dataKey="month" hide />
            <YAxis hide />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#ef9bbf" 
              fill="url(#budgetGradient)" 
            />
            <defs>
              <linearGradient id="budgetGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ef9bbf" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#bff1cf" stopOpacity={0.3} />
              </linearGradient>
            </defs>
          </AreaChart>
        </Chart>
      </Card>

      <h2 className="font-semibold">My Budgets</h2>
      <div className="space-y-3">
        {budgets.map((budget) => (
          <Card 
            key={budget.id} 
            className="p-3 cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => navigate(`/budgets/${budget.id}`)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <IconBadge icon={budget.icon} variant="info" size="md" />
                <p className="font-medium">{budget.name}</p>
              </div>
              <span className="text-sm text-neutral-600">${budget.total.toLocaleString()}</span>
            </div>
            <ProgressBar 
              value={budget.spent} 
              max={budget.total} 
              variant="danger" 
              showLabel 
            />
            <div className="mt-1 text-xs text-neutral-600">
              Left to spend ${(budget.total - budget.spent).toLocaleString()}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


