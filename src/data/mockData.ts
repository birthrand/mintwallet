import type { Card, Goal, Bill, Transaction, Budget, ChartData, TrendData, Notification, UserProfile } from '@/lib/types'

export const cards: Card[] = [
  {
    id: '1',
    name: 'Primary Card Balance',
    balance: 20000,
    currency: 'USD',
    lastFour: '0123',
    expiry: '04/29',
    type: 'primary'
  },
  {
    id: '2',
    name: 'Card Balance',
    balance: 10000,
    currency: 'USD',
    lastFour: '4567',
    expiry: '12/25',
    type: 'secondary'
  }
]

export const goals: Goal[] = [
  {
    id: '1',
    name: 'Vacations',
    target: 1000,
    current: 200,
    currency: 'USD',
    icon: '🏠',
    dueDate: '21st July, 2023'
  },
  {
    id: '2',
    name: 'Emergency Fund',
    target: 5000,
    current: 1500,
    currency: 'USD',
    icon: '💰'
  }
]

export const bills: Bill[] = [
  {
    id: '1',
    name: 'YouTube Premium',
    amount: 54,
    currency: 'USD',
    status: 'paid',
    dueDate: '2022-11-13',
    paymentMethod: 'Google Pay',
    icon: '▶️'
  },
  {
    id: '2',
    name: 'Google Drive',
    amount: 1,
    currency: 'USD',
    status: 'paid',
    dueDate: '2022-11-13',
    paymentMethod: 'Google Pay',
    icon: '☁️'
  },
  {
    id: '3',
    name: 'Food Panda',
    amount: 25,
    currency: 'USD',
    status: 'unpaid',
    dueDate: '2022-11-10',
    icon: '🐼'
  },
  {
    id: '4',
    name: 'Water Bill',
    amount: 85,
    currency: 'USD',
    status: 'unpaid',
    dueDate: '2022-11-11',
    icon: '💧'
  },
  {
    id: '5',
    name: 'Electricity',
    amount: 120,
    currency: 'USD',
    status: 'unpaid',
    dueDate: '2022-11-11',
    icon: '⚡'
  }
]

export const transactions: Transaction[] = [
  {
    id: '1',
    name: 'Restaurant',
    amount: -54,
    currency: 'USD',
    type: 'expense',
    category: 'Food',
    description: 'Ordered a salad',
    date: '2022-11-13',
    icon: '🥗'
  },
  {
    id: '2',
    name: 'Shopping',
    amount: -100,
    currency: 'USD',
    type: 'expense',
    category: 'Shopping',
    description: 'Paid bill via Google Pay',
    date: '2022-11-13',
    icon: '🛍️'
  },
  {
    id: '3',
    name: 'Refund',
    amount: 154,
    currency: 'USD',
    type: 'income',
    category: 'Refund',
    description: 'From aliexpress.com',
    date: '2022-11-01',
    icon: '🏷️'
  },
  {
    id: '4',
    name: 'Dentist',
    amount: -100,
    currency: 'USD',
    type: 'expense',
    category: 'Healthcare',
    description: 'Paid bill via Google Pay',
    date: '2022-11-01',
    icon: '🏥'
  }
]

export const budgets: Budget[] = [
  {
    id: '1',
    name: 'Groceries',
    total: 2910,
    spent: 2425,
    currency: 'USD',
    icon: '🛒',
    period: 'monthly'
  },
  {
    id: '2',
    name: 'Bills',
    total: 2910,
    spent: 2425,
    currency: 'USD',
    icon: '💵',
    period: 'monthly'
  },
  {
    id: '3',
    name: 'Medicines',
    total: 500,
    spent: 200,
    currency: 'USD',
    icon: '💊',
    period: 'monthly'
  }
]

export const incomeChartData: ChartData[] = [
  { name: 'Budget', value: 55, color: '#a8e6cf' },
  { name: 'Goals', value: 25, color: '#ffadad' },
  { name: 'Savings', value: 20, color: '#ffd3b6' }
]

export const trendData: TrendData[] = [
  { month: 'Jun', value: 80 },
  { month: 'Jul', value: 100 },
  { month: 'Aug', value: 120 },
  { month: 'Sep', value: 150 },
  { month: 'Oct', value: 140 }
]

export const notifications: Notification[] = [
  {
    id: '1',
    type: 'bill_due',
    title: 'Bill Due Soon',
    message: 'Your electricity bill is due in 2 days',
    read: false,
    timestamp: '2024-01-15T10:30:00Z',
    icon: '⚡'
  },
  {
    id: '2',
    type: 'goal_achieved',
    title: 'Goal Achieved!',
    message: 'Congratulations! You reached your emergency fund goal',
    read: false,
    timestamp: '2024-01-14T15:45:00Z',
    icon: '🎉'
  },
  {
    id: '3',
    type: 'budget_exceeded',
    title: 'Budget Exceeded',
    message: 'You\'ve exceeded your dining budget by $50',
    read: true,
    timestamp: '2024-01-13T12:20:00Z',
    icon: '⚠️'
  },
  {
    id: '4',
    type: 'transaction_added',
    title: 'Transaction Added',
    message: 'New transaction: $25.50 at Starbucks',
    read: true,
    timestamp: '2024-01-12T09:15:00Z',
    icon: '💳'
  }
]

export const userProfile: UserProfile = {
  id: '1',
  name: 'Habiba',
  email: 'habiba@example.com',
  phone: '+971 50 123 4567',
  currency: 'AED',
  timezone: 'Asia/Dubai'
}
