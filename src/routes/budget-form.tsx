import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { FormInput } from '@/components/ui/FormInput'
import { FormButton } from '@/components/ui/FormButton'
import { IconPicker } from '@/components/ui/IconPicker'
import { useApp } from '@/context/AppContext'
import { ArrowLeft } from 'lucide-react'

const periods = ['monthly', 'weekly', 'yearly']

export default function BudgetForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { budgets, addBudget, updateBudget } = useApp()
  
  const isEditing = Boolean(id)
  const budget = isEditing ? budgets.find(b => b.id === id) : null

  const [formData, setFormData] = useState({
    name: '',
    total: 0,
    spent: 0,
    currency: 'AED',
    icon: '📊',
    period: 'monthly' as 'monthly' | 'weekly' | 'yearly'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isEditing && budget) {
      setFormData({
        name: budget.name,
        total: budget.total,
        spent: budget.spent,
        currency: budget.currency,
        icon: budget.icon,
        period: budget.period
      })
    }
  }, [isEditing, budget])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Budget name is required'
    }

    if (formData.total <= 0) {
      newErrors.total = 'Total budget must be greater than 0'
    }

    if (formData.spent < 0) {
      newErrors.spent = 'Spent amount cannot be negative'
    }

    if (formData.spent > formData.total) {
      newErrors.spent = 'Spent amount cannot exceed total budget'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const budgetData = {
      ...formData,
      total: Number(formData.total),
      spent: Number(formData.spent)
    }

    if (isEditing && budget) {
      updateBudget(budget.id, budgetData)
    } else {
      addBudget(budgetData)
    }

    navigate('/budget')
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="space-y-6">
      <TopBar 
        title={isEditing ? 'Edit Budget' : 'New Budget'} 
        leftIcon={<ArrowLeft size={20} />}
        onLeftClick={() => navigate('/budget')}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold text-neutral-900 mb-4">Budget Information</h3>
          
          <div className="space-y-4">
            <FormInput
              label="Budget Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Monthly Groceries"
              error={errors.name}
            />

            <IconPicker
              selectedIcon={formData.icon}
              onIconSelect={(icon) => handleInputChange('icon', icon)}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Total Budget"
                type="number"
                value={formData.total}
                onChange={(e) => handleInputChange('total', e.target.value)}
                placeholder="0.00"
                error={errors.total}
              />

              <FormInput
                label="Amount Spent"
                type="number"
                value={formData.spent}
                onChange={(e) => handleInputChange('spent', e.target.value)}
                placeholder="0.00"
                error={errors.spent}
                helperText="Current amount spent in this budget"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">Budget Period</label>
              <div className="grid grid-cols-3 gap-2">
                {periods.map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => handleInputChange('period', period)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      formData.period === period
                        ? 'border-pink-400 bg-pink-50 text-pink-700'
                        : 'border-neutral-200 bg-white text-neutral-600'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <FormInput
              label="Currency"
              value={formData.currency}
              onChange={(e) => handleInputChange('currency', e.target.value)}
              placeholder="AED"
            />
          </div>
        </Card>

        {/* Budget Preview */}
        <Card className="p-6">
          <h3 className="font-semibold text-neutral-900 mb-4">Budget Preview</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{formData.icon}</div>
              <div>
                <h4 className="font-medium text-neutral-900">{formData.name || 'Budget Name'}</h4>
                <p className="text-sm text-neutral-600 capitalize">{formData.period} Budget</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Total Budget:</span>
                <span className="font-medium">
                  {formData.total.toLocaleString()} {formData.currency}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Amount Spent:</span>
                <span className="font-medium">
                  {formData.spent.toLocaleString()} {formData.currency}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Remaining:</span>
                <span className="font-medium">
                  {(formData.total - formData.spent).toLocaleString()} {formData.currency}
                </span>
              </div>
            </div>

            {formData.total > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500">Progress</span>
                  <span className="text-neutral-500">
                    {Math.round((formData.spent / formData.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-pink-400 to-green-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((formData.spent / formData.total) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="flex gap-3">
          <FormButton
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => navigate('/budget')}
          >
            Cancel
          </FormButton>
          <FormButton
            type="submit"
            className="flex-1"
          >
            {isEditing ? 'Update Budget' : 'Create Budget'}
          </FormButton>
        </div>
      </form>
    </div>
  )
}
