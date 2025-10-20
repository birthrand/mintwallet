import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { IconBadge } from '@/components/ui/IconBadge'
import { useApp } from '@/context/AppContext'
import { Plus } from 'lucide-react'

export default function Bills() {
  const navigate = useNavigate()
  const { bills } = useApp()
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all')
  
  const filteredBills = bills.filter(bill => {
    if (filter === 'all') return true
    return bill.status === filter
  })

  return (
    <div className="space-y-4">
      <TopBar 
        title="Bills" 
        rightIcon={<Plus size={20} />}
        onRightClick={() => navigate('/bills/new')}
        rightLabel="Add"
      />

      <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
        </TabsList>
        
        <TabsContent value={filter} className="mt-4">
          <div className="space-y-3">
            {filteredBills.map((bill) => (
              <Card 
                key={bill.id} 
                className={`p-3 cursor-pointer hover:shadow-lg transition-all duration-200 ${bill.status === 'paid' ? 'opacity-60' : ''}`}
                onClick={() => navigate(`/bills/${bill.id}`)}
              >
                <div className="flex items-center gap-3">
                  <IconBadge
                    icon={bill.icon} 
                    variant={bill.status === 'paid' ? 'success' : 'danger'}
                    size="md"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{bill.name}</p>
                      {bill.status === 'paid' && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Paid
                        </span>
                      )}
                      {bill.status === 'unpaid' && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          Unpaid
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500">
                      {bill.status === 'paid' 
                        ? `Paid via ${bill.paymentMethod} · ${new Date(bill.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                        : `Due on ${new Date(bill.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                      }
                    </p>
                  </div>
                  <div className={`font-medium ${bill.status === 'paid' ? 'text-neutral-400 line-through' : 'text-rose-500'}`}>
                    -{bill.amount} {bill.currency}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


