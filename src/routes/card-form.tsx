import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { FormInput } from '@/components/ui/FormInput'
import { FormButton } from '@/components/ui/FormButton'
import { useApp } from '@/context/AppContext'
import { ArrowLeft, CreditCard } from 'lucide-react'

export default function CardForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { cards, addCard, updateCard } = useApp()
  
  const isEditing = Boolean(id)
  const card = isEditing ? cards.find(c => c.id === id) : null

  const [formData, setFormData] = useState({
    name: '',
    lastFour: '',
    expiry: '',
    type: 'secondary' as 'primary' | 'secondary',
    balance: 0,
    currency: 'AED'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isEditing && card) {
      setFormData({
        name: card.name,
        lastFour: card.lastFour,
        expiry: card.expiry,
        type: card.type,
        balance: card.balance,
        currency: card.currency
      })
    }
  }, [isEditing, card])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Card name is required'
    }

    if (!formData.lastFour || formData.lastFour.length !== 4) {
      newErrors.lastFour = 'Last 4 digits must be exactly 4 numbers'
    }

    if (!formData.expiry) {
      newErrors.expiry = 'Expiry date is required'
    }

    if (formData.balance < 0) {
      newErrors.balance = 'Balance cannot be negative'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const cardData = {
      ...formData,
      balance: Number(formData.balance)
    }

    if (isEditing && card) {
      updateCard(card.id, cardData)
    } else {
      addCard(cardData)
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

  const handleLastFourChange = (value: string) => {
    // Only allow numbers and limit to 4 digits
    const numbersOnly = value.replace(/\D/g, '').slice(0, 4)
    handleInputChange('lastFour', numbersOnly)
  }

  return (
    <div className="space-y-6">
      <TopBar 
        title={isEditing ? 'Edit Card' : 'New Card'} 
        leftIcon={<ArrowLeft size={20} />}
        onLeftClick={() => navigate('/')}
      />

      {/* Card Preview */}
      <Card variant="gradient" className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center">
            <CreditCard size={24} className="text-neutral-600" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">Card Preview</h3>
            <p className="text-sm text-neutral-600">This is how your card will appear</p>
          </div>
        </div>
        
        <div className="bg-white/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-neutral-600">{formData.name || 'Card Name'}</span>
            <span className="text-xs text-neutral-500">{formData.type.toUpperCase()}</span>
          </div>
          <div className="text-lg font-mono">
            **** **** **** {formData.lastFour || '1234'}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-neutral-600">
              {formData.balance.toLocaleString()} {formData.currency}
            </span>
            <span className="text-sm text-neutral-600">{formData.expiry || 'MM/YY'}</span>
          </div>
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold text-neutral-900 mb-4">Card Information</h3>
          
          <div className="space-y-4">
            <FormInput
              label="Card Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Primary Card"
              error={errors.name}
            />

            <FormInput
              label="Last 4 Digits"
              value={formData.lastFour}
              onChange={(e) => handleLastFourChange(e.target.value)}
              placeholder="1234"
              maxLength={4}
              error={errors.lastFour}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Expiry Date"
                type="month"
                value={formData.expiry}
                onChange={(e) => handleInputChange('expiry', e.target.value)}
                error={errors.expiry}
              />

              <FormInput
                label="Balance"
                type="number"
                value={formData.balance}
                onChange={(e) => handleInputChange('balance', e.target.value)}
                placeholder="0"
                error={errors.balance}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">Card Type</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'primary')}
                  className={`flex-1 p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.type === 'primary'
                      ? 'border-pink-400 bg-pink-50 text-pink-700'
                      : 'border-neutral-200 bg-white text-neutral-600'
                  }`}
                >
                  Primary
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'secondary')}
                  className={`flex-1 p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.type === 'secondary'
                      ? 'border-pink-400 bg-pink-50 text-pink-700'
                      : 'border-neutral-200 bg-white text-neutral-600'
                  }`}
                >
                  Secondary
                </button>
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
            {isEditing ? 'Update Card' : 'Add Card'}
          </FormButton>
        </div>
      </form>
    </div>
  )
}
