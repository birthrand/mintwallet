import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { FormInput } from '@/components/ui/FormInput'
import { FormButton } from '@/components/ui/FormButton'
import { IconPicker } from '@/components/ui/IconPicker'
import { useApp } from '@/context/AppContext'
import { ArrowLeft } from 'lucide-react'

const paymentMethods = [
  'Credit Card', 'Debit Card', 'Bank Transfer', 'Cash', 'Google Pay', 'Apple Pay', 'PayPal'
]

export default function BillForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { bills, addBill, updateBill } = useApp()
  
  const isEditing = Boolean(id)
  const bill = isEditing ? bills.find(b => b.id === id) : null

  const [formData, setFormData] = useState({
    name: '',
    amount: 0,
    currency: 'AED',
    dueDate: '',
    paymentMethod: '',
    icon: '💳',
    status: 'unpaid' as 'paid' | 'unpaid'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isEditing && bill) {
      setFormData({
        name: bill.name,
        amount: bill.amount,
        currency: bill.currency,
        dueDate: bill.dueDate,
        paymentMethod: bill.paymentMethod || '',
        icon: bill.icon,
        status: bill.status
      })
    }
  }, [isEditing, bill])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Bill name is required'
    }

    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const billData = {
      ...formData,
      amount: Number(formData.amount),
      paymentMethod: formData.status === 'paid' ? formData.paymentMethod : undefined
    }

    if (isEditing && bill) {
      updateBill(bill.id, billData)
    } else {
      addBill(billData)
    }

    navigate('/bills')
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
        title={isEditing ? 'Edit Bill' : 'New Bill'} 
        leftIcon={<ArrowLeft size={20} />}
        onLeftClick={() => navigate('/bills')}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold text-neutral-900 mb-4">Bill Information</h3>
          
          <div className="space-y-4">
            <FormInput
              label="Bill Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Electricity Bill"
              error={errors.name}
            />

            <IconPicker
              selectedIcon={formData.icon}
              onIconSelect={(icon) => handleInputChange('icon', icon)}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="0.00"
                error={errors.amount}
              />

              <FormInput
                label="Currency"
                value={formData.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                placeholder="AED"
              />
            </div>

            <FormInput
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              error={errors.dueDate}
            />

            {/* Status Toggle */}
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">Status</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('status', 'unpaid')}
                  className={`flex-1 p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.status === 'unpaid'
                      ? 'border-red-400 bg-red-50 text-red-700'
                      : 'border-neutral-200 bg-white text-neutral-600'
                  }`}
                >
                  Unpaid
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('status', 'paid')}
                  className={`flex-1 p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.status === 'paid'
                      ? 'border-green-400 bg-green-50 text-green-700'
                      : 'border-neutral-200 bg-white text-neutral-600'
                  }`}
                >
                  Paid
                </button>
              </div>
            </div>

            {/* Payment Method - only show if status is paid */}
            {formData.status === 'paid' && (
              <div>
                <label className="text-sm font-medium text-neutral-700 mb-2 block">Payment Method</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white/70 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                >
                  <option value="">Select payment method</option>
                  {paymentMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </Card>

        <div className="flex gap-3">
          <FormButton
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => navigate('/bills')}
          >
            Cancel
          </FormButton>
          <FormButton
            type="submit"
            className="flex-1"
          >
            {isEditing ? 'Update Bill' : 'Add Bill'}
          </FormButton>
        </div>
      </form>
    </div>
  )
}
