import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { FormInput } from '@/components/ui/FormInput'
import { FormButton } from '@/components/ui/FormButton'
import { IconPicker } from '@/components/ui/IconPicker'
import { useApp } from '@/context/AppContext'
import { ArrowLeft } from 'lucide-react'

export default function GoalForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { goals, addGoal, updateGoal } = useApp()
  
  const isEditing = Boolean(id)
  const goal = isEditing ? goals.find(g => g.id === id) : null

  const [formData, setFormData] = useState({
    name: '',
    target: 0,
    current: 0,
    currency: 'AED',
    icon: '💰',
    dueDate: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isEditing && goal) {
      setFormData({
        name: goal.name,
        target: goal.target,
        current: goal.current,
        currency: goal.currency,
        icon: goal.icon,
        dueDate: goal.dueDate || ''
      })
    }
  }, [isEditing, goal])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Goal name is required'
    }

    if (formData.target <= 0) {
      newErrors.target = 'Target amount must be greater than 0'
    }

    if (formData.current < 0) {
      newErrors.current = 'Current amount cannot be negative'
    }

    if (formData.current > formData.target) {
      newErrors.current = 'Current amount cannot exceed target amount'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const goalData = {
      ...formData,
      target: Number(formData.target),
      current: Number(formData.current)
    }

    if (isEditing && goal) {
      updateGoal(goal.id, goalData)
    } else {
      addGoal(goalData)
    }

    navigate('/')
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
        title={isEditing ? 'Edit Goal' : 'New Goal'} 
        leftIcon={<ArrowLeft size={20} />}
        onLeftClick={() => navigate('/')}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold text-neutral-900 mb-4">Goal Information</h3>
          
          <div className="space-y-4">
            <FormInput
              label="Goal Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Emergency Fund"
              error={errors.name}
            />

            <IconPicker
              selectedIcon={formData.icon}
              onIconSelect={(icon) => handleInputChange('icon', icon)}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Target Amount"
                type="number"
                value={formData.target}
                onChange={(e) => handleInputChange('target', e.target.value)}
                placeholder="0"
                error={errors.target}
              />

              <FormInput
                label="Current Amount"
                type="number"
                value={formData.current}
                onChange={(e) => handleInputChange('current', e.target.value)}
                placeholder="0"
                error={errors.current}
              />
            </div>

            <FormInput
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              helperText="Optional - when you want to achieve this goal"
            />

            <FormInput
              label="Currency"
              value={formData.currency}
              onChange={(e) => handleInputChange('currency', e.target.value)}
              placeholder="AED"
            />
          </div>
        </Card>

        <div className="flex gap-3">
          <FormButton
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => navigate('/')}
          >
            Cancel
          </FormButton>
          <FormButton
            type="submit"
            className="flex-1"
          >
            {isEditing ? 'Update Goal' : 'Create Goal'}
          </FormButton>
        </div>
      </form>
    </div>
  )
}
