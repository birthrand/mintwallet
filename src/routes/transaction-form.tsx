import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { FormInput } from '@/components/ui/FormInput'
import { FormButton } from '@/components/ui/FormButton'
import { IconPicker } from '@/components/ui/IconPicker'
import { useApp } from '@/context/AppContext'
import { ArrowLeft } from 'lucide-react'

const categories = [
  'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Healthcare',
  'Bills & Utilities', 'Education', 'Travel', 'Groceries', 'Other'
]

export default function TransactionForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { transactions, addTransaction, updateTransaction } = useApp()
  
  const isEditing = Boolean(id)
  const transaction = isEditing ? transactions.find(t => t.id === id) : null

  const [formData, setFormData] = useState({
    name: '',
    amount: 0,
    currency: 'AED',
    type: 'expense' as 'expense' | 'income',
    category: 'Other',
    description: '',
    date: new Date().toISOString().split('T')[0],
    icon: '💳'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isEditing && transaction) {
      setFormData({
        name: transaction.name,
        amount: Math.abs(transaction.amount),
        currency: transaction.currency,
        type: transaction.type,
        category: transaction.category,
        description: transaction.description,
        date: transaction.date,
        icon: transaction.icon
      })
    }
  }, [isEditing, transaction])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Transaction name is required'
    }

    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const transactionData = {
      ...formData,
      amount: formData.type === 'expense' ? -Math.abs(formData.amount) : Math.abs(formData.amount)
    }

    if (isEditing && transaction) {
      updateTransaction(transaction.id, transactionData)
    } else {
      addTransaction(transactionData)
    }

    navigate('/transactions')
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
        title={isEditing ? 'Edit Transaction' : 'New Transaction'} 
        leftIcon={<ArrowLeft size={20} />}
        onLeftClick={() => navigate('/transactions')}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold text-neutral-900 mb-4">Transaction Information</h3>
          
          <div className="space-y-4">
            <FormInput
              label="Transaction Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Coffee at Starbucks"
              error={errors.name}
            />

            <IconPicker
              selectedIcon={formData.icon}
              onIconSelect={(icon) => handleInputChange('icon', icon)}
            />

            {/* Transaction Type Toggle */}
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">Transaction Type</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'expense')}
                  className={`flex-1 p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.type === 'expense'
                      ? 'border-red-400 bg-red-50 text-red-700'
                      : 'border-neutral-200 bg-white text-neutral-600'
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'income')}
                  className={`flex-1 p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.type === 'income'
                      ? 'border-green-400 bg-green-50 text-green-700'
                      : 'border-neutral-200 bg-white text-neutral-600'
                  }`}
                >
                  Income
                </button>
              </div>
            </div>

            <FormInput
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="0.00"
              error={errors.amount}
            />

            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border bg-white/70 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200 ${
                  errors.category ? 'border-red-300' : 'border-neutral-200'
                }`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-red-600 mt-1">{errors.category}</p>
              )}
            </div>

            <FormInput
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Optional description"
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                error={errors.date}
              />

              <FormInput
                label="Currency"
                value={formData.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                placeholder="AED"
              />
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <FormButton
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => navigate('/transactions')}
          >
            Cancel
          </FormButton>
          <FormButton
            type="submit"
            className="flex-1"
          >
            {isEditing ? 'Update Transaction' : 'Add Transaction'}
          </FormButton>
        </div>
      </form>
    </div>
  )
}
