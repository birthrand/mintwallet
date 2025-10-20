export interface Card {
  id: string
  name: string
  balance: number
  currency: string
  lastFour: string
  expiry: string
  type: 'primary' | 'secondary'
}

export interface Goal {
  id: string
  name: string
  target: number
  current: number
  currency: string
  icon: string
  dueDate?: string
}

export interface Bill {
  id: string
  name: string
  amount: number
  currency: string
  status: 'paid' | 'unpaid'
  dueDate: string
  paymentMethod?: string
  icon: string
}

export interface Transaction {
  id: string
  name: string
  amount: number
  currency: string
  type: 'expense' | 'income'
  category: string
  description: string
  date: string
  icon: string
}

export interface Budget {
  id: string
  name: string
  total: number
  spent: number
  currency: string
  icon: string
  period: 'monthly' | 'weekly' | 'yearly'
}

export interface ChartData {
  name: string
  value: number
  color?: string
  [key: string]: any
}

export interface TrendData {
  month: string
  value: number
}

export interface Notification {
  id: string
  type: 'bill_due' | 'goal_achieved' | 'budget_exceeded' | 'transaction_added'
  title: string
  message: string
  read: boolean
  timestamp: string
  icon: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  currency: string
  timezone: string
}
