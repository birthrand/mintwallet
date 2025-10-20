import { useParams, useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { FormButton } from '@/components/ui/FormButton'
import { IconBadge } from '@/components/ui/IconBadge'
import { useApp } from '@/context/AppContext'
import { ArrowLeft, Edit, Trash2, Star, CreditCard } from 'lucide-react'

export default function CardDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { cards, transactions, deleteCard, updateCard } = useApp()
  
  const card = cards.find(c => c.id === id)
  
  if (!card) {
    return (
      <div className="space-y-6">
        <TopBar title="Card Not Found" />
        <Card className="p-6 text-center">
          <p className="text-neutral-500">This card could not be found.</p>
        </Card>
      </div>
    )
  }

  // Filter transactions for this card (mock - in real app would have cardId field)
  const cardTransactions = transactions.slice(0, 5) // Show last 5 transactions

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      deleteCard(card.id)
      navigate('/')
    }
  }

  const handleSetPrimary = () => {
    // Set all other cards as secondary
    cards.forEach(c => {
      if (c.id !== card.id) {
        updateCard(c.id, { type: 'secondary' })
      }
    })
    // Set this card as primary
    updateCard(card.id, { type: 'primary' })
  }

  return (
    <div className="space-y-6">
      <TopBar 
        title="Card Details" 
        leftIcon={<ArrowLeft size={20} />}
        onLeftClick={() => navigate('/')}
      />

      {/* Card Display */}
      <Card variant="gradient" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center">
              <CreditCard size={24} className="text-neutral-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">{card.name}</h2>
              <p className="text-sm text-neutral-600">**** **** **** {card.lastFour}</p>
            </div>
          </div>
          {card.type === 'primary' && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="text-xs font-medium">Primary</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-neutral-600">Balance:</span>
            <span className="text-xl font-bold text-neutral-900">
              {card.balance.toLocaleString()} {card.currency}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Expires:</span>
            <span className="font-medium">{card.expiry}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Type:</span>
            <span className="font-medium capitalize">{card.type}</span>
          </div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {cardTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-4">
              <div className="flex items-center gap-3">
                <IconBadge 
                  icon={transaction.icon} 
                  variant={transaction.type === 'income' ? 'success' : 'danger'}
                  size="md"
                />
                <div className="flex-1">
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-xs text-neutral-500">{transaction.description}</p>
                </div>
                <div className={`font-medium ${transaction.amount < 0 ? 'text-rose-500' : 'text-green-600'}`}>
                  {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)} {transaction.currency}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {card.type !== 'primary' && (
          <FormButton
            variant="secondary"
            className="w-full"
            onClick={handleSetPrimary}
          >
            <div className="flex items-center justify-center gap-2">
              <Star size={16} />
              Set as Primary Card
            </div>
          </FormButton>
        )}
        
        <div className="flex gap-3">
          <FormButton
            variant="secondary"
            className="flex-1"
            onClick={() => navigate(`/cards/${card.id}/edit`)}
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
    </div>
  )
}
