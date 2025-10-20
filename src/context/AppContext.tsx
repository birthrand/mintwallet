import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Card, Goal, Bill, Transaction, Budget, Notification, UserProfile } from '@/lib/types'
import { 
  getAllCards,
  addCard as addCardToFirestore,
  updateCard as updateCardInFirestore,
  deleteCard as deleteCardFromFirestore,
  getAllGoals,
  addGoal as addGoalToFirestore,
  updateGoal as updateGoalInFirestore,
  deleteGoal as deleteGoalFromFirestore,
  getAllBills,
  addBill as addBillToFirestore,
  updateBill as updateBillInFirestore,
  deleteBill as deleteBillFromFirestore,
  getAllTransactions,
  addTransaction as addTransactionToFirestore,
  updateTransaction as updateTransactionInFirestore,
  deleteTransaction as deleteTransactionFromFirestore,
  getAllBudgets,
  addBudget as addBudgetToFirestore,
  updateBudget as updateBudgetInFirestore,
  deleteBudget as deleteBudgetFromFirestore,
  getAllNotifications,
  addNotification as addNotificationToFirestore,
  updateNotification as updateNotificationInFirestore,
  deleteNotification as deleteNotificationFromFirestore,
  getUserProfile,
  updateUserProfile as updateUserProfileInFirestore
} from '@/services/firestore.service'
import { incomeChartData as initialIncomeChartData } from '@/data/mockData'

interface AppContextType {
  // Data
  cards: Card[]
  goals: Goal[]
  bills: Bill[]
  transactions: Transaction[]
  budgets: Budget[]
  notifications: Notification[]
  userProfile: UserProfile
  incomeChartData: any[]
  loading: boolean

  // CRUD Operations for Cards
  addCard: (card: Omit<Card, 'id'>) => void
  updateCard: (id: string, card: Partial<Card>) => void
  deleteCard: (id: string) => void

  // CRUD Operations for Goals
  addGoal: (goal: Omit<Goal, 'id'>) => void
  updateGoal: (id: string, goal: Partial<Goal>) => void
  deleteGoal: (id: string) => void

  // CRUD Operations for Bills
  addBill: (bill: Omit<Bill, 'id'>) => void
  updateBill: (id: string, bill: Partial<Bill>) => void
  deleteBill: (id: string) => void

  // CRUD Operations for Transactions
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void

  // CRUD Operations for Budgets
  addBudget: (budget: Omit<Budget, 'id'>) => void
  updateBudget: (id: string, budget: Partial<Budget>) => void
  deleteBudget: (id: string) => void

  // Notification Operations
  markNotificationAsRead: (id: string) => void
  markAllNotificationsAsRead: () => void
  deleteNotification: (id: string) => void
  addNotification: (notification: Omit<Notification, 'id'>) => void

  // User Profile Operations
  updateUserProfile: (profile: Partial<UserProfile>) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [bills, setBills] = useState<Bill[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    currency: 'USD',
    timezone: 'UTC'
  })
  const [incomeChartData] = useState(initialIncomeChartData)
  const [loading, setLoading] = useState(true)

  // Load data from Firestore on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          cardsData,
          goalsData,
          billsData,
          transactionsData,
          budgetsData,
          notificationsData,
          userProfileData
        ] = await Promise.all([
          getAllCards(),
          getAllGoals(),
          getAllBills(),
          getAllTransactions(),
          getAllBudgets(),
          getAllNotifications(),
          getUserProfile()
        ])

        setCards(cardsData)
        setGoals(goalsData)
        setBills(billsData)
        setTransactions(transactionsData)
        setBudgets(budgetsData)
        setNotifications(notificationsData)
        
        if (userProfileData) {
          setUserProfile(userProfileData)
        }
      } catch (error) {
        console.error('Error loading data from Firestore:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Card operations
  const addCard = async (card: Omit<Card, 'id'>) => {
    try {
      const newCard = await addCardToFirestore(card)
      setCards(prev => [...prev, newCard])
    } catch (error) {
      console.error('Error adding card:', error)
    }
  }

  const updateCard = async (id: string, card: Partial<Card>) => {
    try {
      await updateCardInFirestore(id, card)
      setCards(prev => prev.map(c => c.id === id ? { ...c, ...card } : c))
    } catch (error) {
      console.error('Error updating card:', error)
    }
  }

  const deleteCard = async (id: string) => {
    try {
      await deleteCardFromFirestore(id)
      setCards(prev => prev.filter(c => c.id !== id))
    } catch (error) {
      console.error('Error deleting card:', error)
    }
  }

  // Goal operations
  const addGoal = async (goal: Omit<Goal, 'id'>) => {
    try {
      const newGoal = await addGoalToFirestore(goal)
      setGoals(prev => [...prev, newGoal])
    } catch (error) {
      console.error('Error adding goal:', error)
    }
  }

  const updateGoal = async (id: string, goal: Partial<Goal>) => {
    try {
      await updateGoalInFirestore(id, goal)
      setGoals(prev => prev.map(g => g.id === id ? { ...g, ...goal } : g))
    } catch (error) {
      console.error('Error updating goal:', error)
    }
  }

  const deleteGoal = async (id: string) => {
    try {
      await deleteGoalFromFirestore(id)
      setGoals(prev => prev.filter(g => g.id !== id))
    } catch (error) {
      console.error('Error deleting goal:', error)
    }
  }

  // Bill operations
  const addBill = async (bill: Omit<Bill, 'id'>) => {
    try {
      const newBill = await addBillToFirestore(bill)
      setBills(prev => [...prev, newBill])
    } catch (error) {
      console.error('Error adding bill:', error)
    }
  }

  const updateBill = async (id: string, bill: Partial<Bill>) => {
    try {
      await updateBillInFirestore(id, bill)
      setBills(prev => prev.map(b => b.id === id ? { ...b, ...bill } : b))
    } catch (error) {
      console.error('Error updating bill:', error)
    }
  }

  const deleteBill = async (id: string) => {
    try {
      await deleteBillFromFirestore(id)
      setBills(prev => prev.filter(b => b.id !== id))
    } catch (error) {
      console.error('Error deleting bill:', error)
    }
  }

  // Transaction operations
  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const newTransaction = await addTransactionToFirestore(transaction)
      setTransactions(prev => [...prev, newTransaction])
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  const updateTransaction = async (id: string, transaction: Partial<Transaction>) => {
    try {
      await updateTransactionInFirestore(id, transaction)
      setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...transaction } : t))
    } catch (error) {
      console.error('Error updating transaction:', error)
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      await deleteTransactionFromFirestore(id)
      setTransactions(prev => prev.filter(t => t.id !== id))
    } catch (error) {
      console.error('Error deleting transaction:', error)
    }
  }

  // Budget operations
  const addBudget = async (budget: Omit<Budget, 'id'>) => {
    try {
      const newBudget = await addBudgetToFirestore(budget)
      setBudgets(prev => [...prev, newBudget])
    } catch (error) {
      console.error('Error adding budget:', error)
    }
  }

  const updateBudget = async (id: string, budget: Partial<Budget>) => {
    try {
      await updateBudgetInFirestore(id, budget)
      setBudgets(prev => prev.map(b => b.id === id ? { ...b, ...budget } : b))
    } catch (error) {
      console.error('Error updating budget:', error)
    }
  }

  const deleteBudget = async (id: string) => {
    try {
      await deleteBudgetFromFirestore(id)
      setBudgets(prev => prev.filter(b => b.id !== id))
    } catch (error) {
      console.error('Error deleting budget:', error)
    }
  }

  // Notification operations
  const markNotificationAsRead = async (id: string) => {
    try {
      await updateNotificationInFirestore(id, { read: true })
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const markAllNotificationsAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read)
      await Promise.all(
        unreadNotifications.map(n => updateNotificationInFirestore(n.id, { read: true }))
      )
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      await deleteNotificationFromFirestore(id)
      setNotifications(prev => prev.filter(n => n.id !== id))
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }

  const addNotification = async (notification: Omit<Notification, 'id'>) => {
    try {
      const newNotification = await addNotificationToFirestore(notification)
      setNotifications(prev => [newNotification, ...prev])
    } catch (error) {
      console.error('Error adding notification:', error)
    }
  }

  // User profile operations
  const updateUserProfile = async (profile: Partial<UserProfile>) => {
    try {
      await updateUserProfileInFirestore(profile)
      setUserProfile(prev => ({ ...prev, ...profile }))
    } catch (error) {
      console.error('Error updating user profile:', error)
    }
  }

  const value: AppContextType = {
    cards,
    goals,
    bills,
    transactions,
    budgets,
    notifications,
    userProfile,
    incomeChartData,
    loading,
    addCard,
    updateCard,
    deleteCard,
    addGoal,
    updateGoal,
    deleteGoal,
    addBill,
    updateBill,
    deleteBill,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addBudget,
    updateBudget,
    deleteBudget,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    addNotification,
    updateUserProfile
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
