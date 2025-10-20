import { useParams, useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell } from 'recharts'
import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { FormButton } from '@/components/ui/FormButton'
import { Chart } from '@/components/ui/Chart'
import { useApp } from '@/context/AppContext'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'

export default function GoalDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { goals, deleteGoal } = useApp()
  
  const goal = goals.find(g => g.id === id)
  
  if (!goal) {
    return (
      <div className="space-y-6">
        <TopBar title="Goal Not Found" />
        <Card className="p-6 text-center">
          <p className="text-neutral-500">This goal could not be found.</p>
        </Card>
      </div>
    )
  }

  const progress = (goal.current / goal.target) * 100
  const remaining = goal.target - goal.current

  const chartData = [
    { name: 'Completed', value: goal.current, color: '#a8e6cf' },
    { name: 'Remaining', value: remaining, color: '#f0f0f0' }
  ]

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      deleteGoal(goal.id)
      navigate('/')
    }
  }

  return (
    <div className="space-y-6">
      <TopBar 
        title="Goal Details" 
        leftIcon={<ArrowLeft size={20} />}
        onLeftClick={() => navigate('/')}
      />

      {/* Progress Chart */}
      <Card variant="gradient" className="p-6">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{goal.icon}</div>
          <h2 className="text-xl font-semibold text-neutral-900">{goal.name}</h2>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <Chart height={200}>
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </Chart>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-neutral-900">
            {Math.round(progress)}%
          </div>
          <p className="text-sm text-neutral-600">Complete</p>
        </div>
      </Card>

      {/* Goal Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {goal.current.toLocaleString()} {goal.currency}
          </div>
          <p className="text-sm text-neutral-500">Current</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-neutral-900">
            {goal.target.toLocaleString()} {goal.currency}
          </div>
          <p className="text-sm text-neutral-500">Target</p>
        </Card>
      </div>

      {/* Goal Info */}
      <Card className="p-4">
        <h3 className="font-semibold text-neutral-900 mb-3">Goal Information</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-600">Due Date:</span>
            <span className="font-medium">
              {goal.dueDate ? new Date(goal.dueDate).toLocaleDateString() : 'No due date'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Remaining:</span>
            <span className="font-medium">
              {remaining.toLocaleString()} {goal.currency}
            </span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <FormButton
          variant="secondary"
          className="flex-1"
          onClick={() => navigate(`/goals/${goal.id}/edit`)}
        >
          <div className="flex items-center justify-center gap-2">
            <Edit size={16} />
            Edit
          </div>
        </FormButton>
        <FormButton
          variant="danger"
          className="flex-1"
          onClick={handleDelete}
        >
          <div className="flex items-center justify-center gap-2">
            <Trash2 size={16} />
            Delete
          </div>
        </FormButton>
      </div>
    </div>
  )
}
