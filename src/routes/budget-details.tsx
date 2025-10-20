import { useParams, useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { FormButton } from '@/components/ui/FormButton'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Chart } from '@/components/ui/Chart'
import { useApp } from '@/context/AppContext'
import { ArrowLeft, Edit, Trash2, TrendingUp } from 'lucide-react'

export default function BudgetDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { budgets, deleteBudget } = useApp()
  
  const budget = budgets.find(b => b.id === id)
  
  if (!budget) {
    return (
      <div className="space-y-6">
        <TopBar title="Budget Not Found" />
        <Card className="p-6 text-center">
          <p className="text-neutral-500">This budget could not be found.</p>
        </Card>
      </div>
    )
  }

  const progress = (budget.spent / budget.total) * 100
  const remaining = budget.total - budget.spent
  const isOverBudget = budget.spent > budget.total

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      deleteBudget(budget.id)
      navigate('/budget')
    }
  }

  // Mock spending by category data
  const categoryData = [
    { category: 'Food', spent: 450, limit: 600 },
    { category: 'Transport', spent: 200, limit: 300 },
    { category: 'Entertainment', spent: 150, limit: 200 },
    { category: 'Shopping', spent: 300, limit: 400 }
  ]

  // Mock monthly trend data
  const trendData = [
    { month: 'Jan', spent: 800 },
    { month: 'Feb', spent: 950 },
    { month: 'Mar', spent: 1100 },
    { month: 'Apr', spent: budget.spent }
  ]

  return (
    <div className="space-y-6">
      <TopBar 
        title="Budget Details" 
        leftIcon={<ArrowLeft size={20} />}
        onLeftClick={() => navigate('/budget')}
      />

      {/* Budget Overview */}
      <Card variant="gradient" className="p-6">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{budget.icon}</div>
          <h2 className="text-xl font-semibold text-neutral-900">{budget.name}</h2>
          <p className="text-sm text-neutral-600 capitalize">{budget.period} Budget</p>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900">
              {budget.spent.toLocaleString()} / {budget.total.toLocaleString()} {budget.currency}
            </div>
            <p className="text-sm text-neutral-500">Spent of Total</p>
          </div>

          <ProgressBar
            value={Math.min(progress, 100)}
            max={100}
            variant={isOverBudget ? 'danger' : 'success'}
            size="lg"
            showLabel
            className="mt-4"
          />

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className={`text-lg font-bold ${isOverBudget ? 'text-red-500' : 'text-green-600'}`}>
                {remaining.toLocaleString()} {budget.currency}
              </div>
              <p className="text-xs text-neutral-500">
                {isOverBudget ? 'Over Budget' : 'Remaining'}
              </p>
            </div>
            <div>
              <div className="text-lg font-bold text-neutral-900">
                {Math.round(progress)}%
              </div>
              <p className="text-xs text-neutral-500">Used</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Spending by Category */}
      <Card className="p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Spending by Category</h3>
        <div className="space-y-3">
          {categoryData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.category}</span>
                <span className="text-neutral-600">
                  {item.spent} / {item.limit} {budget.currency}
                </span>
              </div>
              <ProgressBar
                value={(item.spent / item.limit) * 100}
                max={100}
                variant={item.spent > item.limit ? 'danger' : 'default'}
                size="sm"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Monthly Trend */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-neutral-600" />
          <h3 className="font-semibold text-neutral-900">Monthly Trend</h3>
        </div>
        <Chart height={200}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="spent" fill="#a8e6cf" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      </Card>

      {/* Budget Information */}
      <Card className="p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Budget Information</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-neutral-600">Total Budget:</span>
            <span className="font-medium">
              {budget.total.toLocaleString()} {budget.currency}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Amount Spent:</span>
            <span className="font-medium">
              {budget.spent.toLocaleString()} {budget.currency}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Period:</span>
            <span className="font-medium capitalize">{budget.period}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Status:</span>
            <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
              {isOverBudget ? 'Over Budget' : 'On Track'}
            </span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <FormButton
          variant="secondary"
          className="flex-1"
          onClick={() => navigate(`/budgets/${budget.id}/edit`)}
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
