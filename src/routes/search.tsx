import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Card from '@/components/ui/card'
import { IconBadge } from '@/components/ui/IconBadge'
import { EmptyState } from '@/components/ui/EmptyState'
import { useApp } from '@/context/AppContext'
import { Search as SearchIcon, Clock } from 'lucide-react'

export default function Search() {
  const navigate = useNavigate()
  const { cards, goals, bills, transactions, budgets } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // Recent searches (mock data)
  const recentSearches = ['Starbucks', 'Electricity', 'Emergency Fund', 'Groceries']

  // Combine all data for search
  const allData = useMemo(() => [
    ...cards.map(card => ({ ...card, type: 'card', searchText: `${card.name} ${card.lastFour}` })),
    ...goals.map(goal => ({ ...goal, type: 'goal', searchText: `${goal.name} ${goal.icon}` })),
    ...bills.map(bill => ({ ...bill, type: 'bill', searchText: `${bill.name} ${bill.icon}` })),
    ...transactions.map(transaction => ({ ...transaction, type: 'transaction', searchText: `${transaction.name} ${transaction.description} ${transaction.category}` })),
    ...budgets.map(budget => ({ ...budget, type: 'budget', searchText: `${budget.name} ${budget.icon}` }))
  ], [cards, goals, bills, transactions, budgets])

  // Filter data based on search query and active tab
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()
    let filtered = allData.filter(item => 
      item.searchText.toLowerCase().includes(query)
    )

    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.type === activeTab)
    }

    return filtered
  }, [allData, searchQuery, activeTab])

  const handleItemClick = (item: any) => {
    switch (item.type) {
      case 'card':
        navigate(`/cards/${item.id}`)
        break
      case 'goal':
        navigate(`/goals/${item.id}`)
        break
      case 'bill':
        navigate(`/bills/${item.id}`)
        break
      case 'transaction':
        navigate(`/transactions/${item.id}`)
        break
      case 'budget':
        navigate(`/budgets/${item.id}`)
        break
    }
  }

  const getItemIcon = (item: any) => {
    switch (item.type) {
      case 'card':
        return '💳'
      case 'goal':
        return item.icon
      case 'bill':
        return item.icon
      case 'transaction':
        return item.icon
      case 'budget':
        return item.icon
      default:
        return '📄'
    }
  }

  const getItemTitle = (item: any) => {
    switch (item.type) {
      case 'card':
        return item.name
      case 'goal':
        return item.name
      case 'bill':
        return item.name
      case 'transaction':
        return item.name
      case 'budget':
        return item.name
      default:
        return 'Unknown'
    }
  }

  const getItemSubtitle = (item: any) => {
    switch (item.type) {
      case 'card':
        return `**** ${item.lastFour} • ${item.balance.toLocaleString()} ${item.currency}`
      case 'goal':
        return `${item.current.toLocaleString()} / ${item.target.toLocaleString()} ${item.currency}`
      case 'bill':
        return `${item.amount.toLocaleString()} ${item.currency} • ${item.status}`
      case 'transaction':
        return `${item.category} • ${item.amount < 0 ? '-' : '+'}${Math.abs(item.amount)} ${item.currency}`
      case 'budget':
        return `${item.spent.toLocaleString()} / ${item.total.toLocaleString()} ${item.currency}`
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="px-1">
        <div className="relative">
          <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search transactions, bills, goals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-white/70 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
          />
        </div>
      </div>

      {!searchQuery.trim() ? (
        // Recent Searches
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Clock size={16} className="text-neutral-400" />
            <h3 className="font-medium text-neutral-900">Recent Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(search)}
                className="px-3 py-2 bg-white/70 border border-neutral-200 rounded-xl text-sm text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Search Results
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-medium text-neutral-900">
              {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} found
            </h3>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="transaction">Txns</TabsTrigger>
                <TabsTrigger value="bill">Bills</TabsTrigger>
                <TabsTrigger value="card">Cards</TabsTrigger>
                <TabsTrigger value="goal">Goals</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {filteredData.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No results found"
              description="Try searching with different keywords or check your spelling"
            />
          ) : (
            <div className="space-y-3">
              {filteredData.map((item) => (
                <Card
                  key={`${item.type}-${item.id}`}
                  className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex items-center gap-3">
                    <IconBadge
                      icon={getItemIcon(item)}
                      variant="default"
                      size="md"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">{getItemTitle(item)}</p>
                      <p className="text-sm text-neutral-500">{getItemSubtitle(item)}</p>
                    </div>
                    <div className="text-xs text-neutral-400 capitalize">
                      {item.type}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
