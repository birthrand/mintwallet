import { useParams, useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { FormButton } from '@/components/ui/FormButton'
import { IconBadge } from '@/components/ui/IconBadge'
import { useApp } from '@/context/AppContext'
import { ArrowLeft, Edit, Trash2, Calendar, Tag } from 'lucide-react'

export default function TransactionDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { transactions, deleteTransaction } = useApp()
  
  const transaction = transactions.find(t => t.id === id)
  
  if (!transaction) {
    return (
      <div className="space-y-6">
        <TopBar title="Transaction Not Found" />
        <Card className="p-6 text-center">
          <p className="text-neutral-500">This transaction could not be found.</p>
        </Card>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(transaction.id)
      navigate('/transactions')
    }
  }

  return (
    <div className="space-y-6">
      <TopBar 
        title="Transaction Details" 
        leftIcon={<ArrowLeft size={20} />}
        onLeftClick={() => navigate('/transactions')}
      />

      {/* Transaction Header */}
      <Card variant="gradient" className="p-6">
        <div className="text-center mb-6">
          <IconBadge 
            icon={transaction.icon} 
            variant={transaction.type === 'income' ? 'success' : 'danger'}
            size="lg"
          />
          <h2 className="text-xl font-semibold text-neutral-900 mt-4">{transaction.name}</h2>
          <p className="text-neutral-600">{transaction.description}</p>
        </div>

        <div className="text-center">
          <div className={`text-3xl font-bold ${transaction.amount < 0 ? 'text-rose-500' : 'text-green-600'}`}>
            {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)} {transaction.currency}
          </div>
          <p className="text-sm text-neutral-500 mt-1">
            {transaction.type === 'income' ? 'Income' : 'Expense'}
          </p>
        </div>
      </Card>

      {/* Transaction Details */}
      <Card className="p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Transaction Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Tag size={16} className="text-neutral-400" />
            <div className="flex-1">
              <span className="text-neutral-600">Category:</span>
              <span className="ml-2 font-medium">{transaction.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-neutral-400" />
            <div className="flex-1">
              <span className="text-neutral-600">Date:</span>
              <span className="ml-2 font-medium">
                {new Date(transaction.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-neutral-200 flex items-center justify-center">
              <span className="text-xs">$</span>
            </div>
            <div className="flex-1">
              <span className="text-neutral-600">Amount:</span>
              <span className="ml-2 font-medium">
                {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)} {transaction.currency}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-neutral-200 flex items-center justify-center">
              <span className="text-xs">T</span>
            </div>
            <div className="flex-1">
              <span className="text-neutral-600">Type:</span>
              <span className="ml-2 font-medium capitalize">{transaction.type}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Receipt/Notes Section */}
      <Card className="p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Receipt & Notes</h3>
        <div className="bg-neutral-50 rounded-xl p-4 text-center">
          <p className="text-neutral-500 text-sm">No receipt attached</p>
          <p className="text-xs text-neutral-400 mt-1">Tap to add receipt or notes</p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <FormButton
          variant="secondary"
          className="flex-1"
          onClick={() => navigate(`/transactions/${transaction.id}/edit`)}
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
