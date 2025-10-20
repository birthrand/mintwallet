import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { Header } from '@/components/ui/Header'
import Card from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { IconBadge } from '@/components/ui/IconBadge'
import { Chart } from '@/components/ui/Chart'
import { useApp } from '@/context/AppContext'
import { Plus } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()
  const { cards, goals, incomeChartData } = useApp()
  const [showBreakdown, setShowBreakdown] = useState(false)
  const totalIncome = 20000

  return (
    <div className="space-y-6">
      <Header />

      <Card variant="gradient" className="p-4">
        <div className="grid grid-cols-2 items-center gap-4">
          <div>
            <p className="text-neutral-700">Income</p>
            <p className="text-2xl font-bold">20,000 AED</p>
          </div>
          <button
            type="button"
            aria-expanded={showBreakdown}
            onClick={() => setShowBreakdown((v) => !v)}
            className="rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
          >
            <Chart height={112}>
              <PieChart>
                <Pie 
                  data={incomeChartData} 
                  innerRadius={28} 
                  outerRadius={45} 
                  dataKey="value" 
                  paddingAngle={3}
                >
                  {incomeChartData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </Chart>
          </button>
        </div>
        <div
          className={`mt-3 overflow-hidden transition-all duration-300 ${
            showBreakdown ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="grid grid-cols-3 gap-3 text-sm">
            {incomeChartData.map((item: any) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="min-w-0">
                  <p className="text-neutral-800 truncate">{item.name}</p>
                  <p className="text-neutral-500">
                    {item.value}% · {(Math.round((item.value / 100) * totalIncome)).toLocaleString()} AED
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <section>
        <h2 className="font-semibold mb-2">My Cards</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {cards.map((card) => (
            <Card 
              key={card.id} 
              variant="gradient" 
              className="min-w-[260px] p-4 cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => navigate(`/cards/${card.id}`)}
            >
              <p className="text-sm text-neutral-600">{card.name}</p>
              <p className="text-xl font-bold">{card.balance.toLocaleString()} {card.currency}</p>
              <p className="text-xs text-neutral-500 mt-6">xxxx ···· ···· {card.lastFour}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">My Goals</h2>
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
                <span className="text-sm text-neutral-600">
                  {Math.round((goal.current / goal.target) * 100)}%
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}


