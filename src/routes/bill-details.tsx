import { useParams, useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { FormButton } from '@/components/ui/FormButton'
import { IconBadge } from '@/components/ui/IconBadge'
import { useApp } from '@/context/AppContext'
import { ArrowLeft, Edit, Trash2, Calendar, CreditCard } from 'lucide-react'

export default function BillDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { bills, deleteBill, updateBill } = useApp()
  
  const bill = bills.find(b => b.id === id)
  
  if (!bill) {
    return (
      <div className="space-y-6">
        <TopBar title="Bill Not Found" />
        <Card className="p-6 text-center">
          <p className="text-neutral-500">This bill could not be found.</p>
        </Card>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      deleteBill(bill.id)
      navigate('/bills')
    }
  }

  const handleToggleStatus = () => {
    updateBill(bill.id, { 
      status: bill.status === 'paid' ? 'unpaid' : 'paid',
      paymentMethod: bill.status === 'unpaid' ? 'Credit Card' : undefined
    })
  }

  // Mock payment history
  const paymentHistory = bill.status === 'paid' ? [
    {
      id: '1',
      date: bill.dueDate,
      amount: bill.amount,
      method: bill.paymentMethod || 'Credit Card',
      status: 'completed'
    }
  ] : []

  return (
    <div className="space-y-6">
      <TopBar 
        title="Bill Details" 
        leftIcon={<ArrowLeft size={20} />}
        onLeftClick={() => navigate('/bills')}
      />

      {/* Bill Header */}
      <Card variant="gradient" className="p-6">
        <div className="text-center mb-6">
          <IconBadge 
            icon={bill.icon} 
            variant={bill.status === 'paid' ? 'success' : 'danger'}
            size="lg"
          />
          <h2 className="text-xl font-semibold text-neutral-900 mt-4">{bill.name}</h2>
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mt-2 ${
            bill.status === 'paid' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {bill.status === 'paid' ? '✓ Paid' : '⚠ Unpaid'}
          </div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-neutral-900">
            {bill.amount.toLocaleString()} {bill.currency}
          </div>
          <p className="text-sm text-neutral-500 mt-1">Amount Due</p>
        </div>
      </Card>

      {/* Bill Information */}
      <Card className="p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Bill Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-neutral-400" />
            <div className="flex-1">
              <span className="text-neutral-600">Due Date:</span>
              <span className="ml-2 font-medium">
                {new Date(bill.dueDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard size={16} className="text-neutral-400" />
            <div className="flex-1">
              <span className="text-neutral-600">Payment Method:</span>
              <span className="ml-2 font-medium">
                {bill.paymentMethod || 'Not specified'}
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
                {bill.amount.toLocaleString()} {bill.currency}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-neutral-200 flex items-center justify-center">
              <span className="text-xs">S</span>
            </div>
            <div className="flex-1">
              <span className="text-neutral-600">Status:</span>
              <span className="ml-2 font-medium capitalize">{bill.status}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment History */}
      {paymentHistory.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-neutral-900 mb-4">Payment History</h3>
          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div>
                  <p className="font-medium text-green-800">Payment Completed</p>
                  <p className="text-sm text-green-600">
                    {new Date(payment.date).toLocaleDateString()} • {payment.method}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-800">
                    -{payment.amount} {bill.currency}
                  </p>
                  <p className="text-xs text-green-600">✓ Paid</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <FormButton
          variant={bill.status === 'paid' ? 'secondary' : 'primary'}
          className="w-full"
          onClick={handleToggleStatus}
        >
          {bill.status === 'paid' ? 'Mark as Unpaid' : 'Mark as Paid'}
        </FormButton>
        
        <div className="flex gap-3">
          <FormButton
            variant="secondary"
            className="flex-1"
            onClick={() => navigate(`/bills/${bill.id}/edit`)}
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
