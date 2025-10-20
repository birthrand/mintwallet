import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { IconBadge } from '@/components/ui/IconBadge'
import { useApp } from '@/context/AppContext'
import { Plus } from 'lucide-react'

export default function Transactions() {
  const navigate = useNavigate()
  const { transactions } = useApp()
  const [filter, setFilter] = useState<'all' | 'expense' | 'income'>('all')
  
  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true
    return transaction.type === filter
  })

  return (
    <div className="space-y-4">
      <TopBar 
        title="Transactions" 
        rightIcon={<Plus size={20} />}
        onRightClick={() => navigate('/transactions/new')}
        rightLabel="Add"
      />

      <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
        </TabsList>
        
        <TabsContent value={filter} className="mt-4">
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <Card 
                key={transaction.id} 
                className="p-3 cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => navigate(`/transactions/${transaction.id}`)}
              >
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
        </TabsContent>
      </Tabs>
    </div>
  )
}


