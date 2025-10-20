import { useState } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { Chart } from '@/components/ui/Chart'
import { useApp } from '@/context/AppContext'
import { Download, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

export default function Reports() {
  const { transactions, budgets } = useApp()
  const [dateRange, setDateRange] = useState('month')

  // Calculate summary data
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = Math.abs(transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0))

  const netSavings = totalIncome - totalExpenses

  // Spending by category
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find(item => item.category === t.category)
      if (existing) {
        existing.amount += Math.abs(t.amount)
      } else {
        acc.push({ category: t.category, amount: Math.abs(t.amount), color: getCategoryColor(t.category) })
      }
      return acc
    }, [] as Array<{ category: string; amount: number; color: string }>)
    .sort((a, b) => b.amount - a.amount)

  // Monthly comparison data
  const monthlyData = [
    { month: 'Jan', income: 2500, expenses: 1800 },
    { month: 'Feb', income: 2800, expenses: 2100 },
    { month: 'Mar', income: 3200, expenses: 2400 },
    { month: 'Apr', income: totalIncome, expenses: totalExpenses }
  ]

  // Top spending categories
  const topCategories = categoryData.slice(0, 5)

  function getCategoryColor(category: string) {
    const colors = [
      '#a8e6cf', '#ffadad', '#ffd3b6', '#dcedc1', '#ffd93d',
      '#6bcf7f', '#4d96ff', '#9b59b6', '#e74c3c', '#f39c12'
    ]
    return colors[category.length % colors.length]
  }

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting reports...')
  }

  return (
    <div className="space-y-6">
      <TopBar 
        title="Reports" 
        rightIcon={<Download size={20} />}
        onRightClick={handleExport}
        rightLabel="Export"
      />

      {/* Date Range Selector */}
      <div className="flex gap-2">
        {['week', 'month', 'year'].map((range) => (
          <button
            key={range}
            onClick={() => setDateRange(range)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              dateRange === range
                ? 'bg-gradient-to-r from-pink-400 to-green-400 text-white shadow-lg'
                : 'bg-white/70 border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4">
        <Card variant="gradient" className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Total Income</h3>
              <p className="text-sm text-neutral-600">This {dateRange}</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {totalIncome.toLocaleString()} AED
          </div>
        </Card>

        <Card variant="gradient" className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <TrendingDown size={20} className="text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Total Expenses</h3>
              <p className="text-sm text-neutral-600">This {dateRange}</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {totalExpenses.toLocaleString()} AED
          </div>
        </Card>

        <Card variant="gradient" className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <DollarSign size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Net Savings</h3>
              <p className="text-sm text-neutral-600">This {dateRange}</p>
            </div>
          </div>
          <div className={`text-2xl font-bold ${netSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {netSavings.toLocaleString()} AED
          </div>
        </Card>
      </div>

      {/* Spending by Category */}
      <Card className="p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Spending by Category</h3>
        {categoryData.length > 0 ? (
          <div className="flex items-center justify-center mb-6">
            <Chart height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="amount"
                  paddingAngle={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </Chart>
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-500">
            No spending data available
          </div>
        )}
      </Card>

      {/* Monthly Comparison */}
      <Card className="p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Monthly Comparison</h3>
        <Chart height={250}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="income" fill="#a8e6cf" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#ffadad" name="Expenses" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      </Card>

      {/* Top Spending Categories */}
      <Card className="p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Top Spending Categories</h3>
        {topCategories.length > 0 ? (
          <div className="space-y-3">
            {topCategories.map((category, index) => (
              <div key={category.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                       style={{ backgroundColor: category.color }}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-neutral-900">{category.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-neutral-900">
                    {category.amount.toLocaleString()} AED
                  </div>
                  <div className="text-xs text-neutral-500">
                    {((category.amount / totalExpenses) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-500">
            No category data available
          </div>
        )}
      </Card>

      {/* Budget Performance */}
      <Card className="p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Budget Performance</h3>
        {budgets.length > 0 ? (
          <div className="space-y-4">
            {budgets.map((budget) => {
              const progress = (budget.spent / budget.total) * 100
              const isOverBudget = budget.spent > budget.total
              
              return (
                <div key={budget.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{budget.icon}</span>
                      <span className="font-medium text-neutral-900">{budget.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-neutral-900">
                        {budget.spent.toLocaleString()} / {budget.total.toLocaleString()} AED
                      </div>
                      <div className={`text-xs ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                        {Math.round(progress)}% used
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isOverBudget ? 'bg-red-500' : 'bg-gradient-to-r from-pink-400 to-green-400'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-500">
            No budgets available
          </div>
        )}
      </Card>
    </div>
  )
}
