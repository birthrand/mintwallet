import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Card, Goal, Bill, Transaction, Budget, Notification, UserProfile } from '@/lib/types'

// Collection references
const cardsRef = collection(db, 'cards')
const goalsRef = collection(db, 'goals')
const billsRef = collection(db, 'bills')
const transactionsRef = collection(db, 'transactions')
const budgetsRef = collection(db, 'budgets')
const notificationsRef = collection(db, 'notifications')
const userProfileRef = collection(db, 'userProfile')

// Helper function to convert Firestore document to our type
const convertDoc = (doc: any) => ({
  id: doc.id,
  ...doc.data()
})

// Cards CRUD operations
export const getAllCards = async (): Promise<Card[]> => {
  const snapshot = await getDocs(query(cardsRef, orderBy('name')))
  return snapshot.docs.map(convertDoc) as Card[]
}

export const addCard = async (card: Omit<Card, 'id'>): Promise<Card> => {
  const docRef = await addDoc(cardsRef, {
    ...card,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return { id: docRef.id, ...card } as Card
}

export const updateCard = async (id: string, card: Partial<Card>): Promise<void> => {
  const cardRef = doc(db, 'cards', id)
  await updateDoc(cardRef, {
    ...card,
    updatedAt: serverTimestamp()
  })
}

export const deleteCard = async (id: string): Promise<void> => {
  const cardRef = doc(db, 'cards', id)
  await deleteDoc(cardRef)
}

// Goals CRUD operations
export const getAllGoals = async (): Promise<Goal[]> => {
  const snapshot = await getDocs(query(goalsRef, orderBy('name')))
  return snapshot.docs.map(convertDoc) as Goal[]
}

export const addGoal = async (goal: Omit<Goal, 'id'>): Promise<Goal> => {
  const docRef = await addDoc(goalsRef, {
    ...goal,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return { id: docRef.id, ...goal } as Goal
}

export const updateGoal = async (id: string, goal: Partial<Goal>): Promise<void> => {
  const goalRef = doc(db, 'goals', id)
  await updateDoc(goalRef, {
    ...goal,
    updatedAt: serverTimestamp()
  })
}

export const deleteGoal = async (id: string): Promise<void> => {
  const goalRef = doc(db, 'goals', id)
  await deleteDoc(goalRef)
}

// Bills CRUD operations
export const getAllBills = async (): Promise<Bill[]> => {
  const snapshot = await getDocs(query(billsRef, orderBy('dueDate')))
  return snapshot.docs.map(convertDoc) as Bill[]
}

export const addBill = async (bill: Omit<Bill, 'id'>): Promise<Bill> => {
  const docRef = await addDoc(billsRef, {
    ...bill,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return { id: docRef.id, ...bill } as Bill
}

export const updateBill = async (id: string, bill: Partial<Bill>): Promise<void> => {
  const billRef = doc(db, 'bills', id)
  await updateDoc(billRef, {
    ...bill,
    updatedAt: serverTimestamp()
  })
}

export const deleteBill = async (id: string): Promise<void> => {
  const billRef = doc(db, 'bills', id)
  await deleteDoc(billRef)
}

// Transactions CRUD operations
export const getAllTransactions = async (): Promise<Transaction[]> => {
  const snapshot = await getDocs(query(transactionsRef, orderBy('date', 'desc')))
  return snapshot.docs.map(convertDoc) as Transaction[]
}

export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
  const docRef = await addDoc(transactionsRef, {
    ...transaction,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return { id: docRef.id, ...transaction } as Transaction
}

export const updateTransaction = async (id: string, transaction: Partial<Transaction>): Promise<void> => {
  const transactionRef = doc(db, 'transactions', id)
  await updateDoc(transactionRef, {
    ...transaction,
    updatedAt: serverTimestamp()
  })
}

export const deleteTransaction = async (id: string): Promise<void> => {
  const transactionRef = doc(db, 'transactions', id)
  await deleteDoc(transactionRef)
}

// Budgets CRUD operations
export const getAllBudgets = async (): Promise<Budget[]> => {
  const snapshot = await getDocs(query(budgetsRef, orderBy('name')))
  return snapshot.docs.map(convertDoc) as Budget[]
}

export const addBudget = async (budget: Omit<Budget, 'id'>): Promise<Budget> => {
  const docRef = await addDoc(budgetsRef, {
    ...budget,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return { id: docRef.id, ...budget } as Budget
}

export const updateBudget = async (id: string, budget: Partial<Budget>): Promise<void> => {
  const budgetRef = doc(db, 'budgets', id)
  await updateDoc(budgetRef, {
    ...budget,
    updatedAt: serverTimestamp()
  })
}

export const deleteBudget = async (id: string): Promise<void> => {
  const budgetRef = doc(db, 'budgets', id)
  await deleteDoc(budgetRef)
}

// Notifications CRUD operations
export const getAllNotifications = async (): Promise<Notification[]> => {
  const snapshot = await getDocs(query(notificationsRef, orderBy('timestamp', 'desc')))
  return snapshot.docs.map(convertDoc) as Notification[]
}

export const addNotification = async (notification: Omit<Notification, 'id'>): Promise<Notification> => {
  const docRef = await addDoc(notificationsRef, {
    ...notification,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return { id: docRef.id, ...notification } as Notification
}

export const updateNotification = async (id: string, notification: Partial<Notification>): Promise<void> => {
  const notificationRef = doc(db, 'notifications', id)
  await updateDoc(notificationRef, {
    ...notification,
    updatedAt: serverTimestamp()
  })
}

export const deleteNotification = async (id: string): Promise<void> => {
  const notificationRef = doc(db, 'notifications', id)
  await deleteDoc(notificationRef)
}

// User Profile operations (single document)
export const getUserProfile = async (): Promise<UserProfile | null> => {
  const snapshot = await getDocs(userProfileRef)
  if (snapshot.empty) return null
  return convertDoc(snapshot.docs[0]) as UserProfile
}

export const updateUserProfile = async (profile: Partial<UserProfile>): Promise<void> => {
  const snapshot = await getDocs(userProfileRef)
  if (snapshot.empty) {
    // Create new profile if none exists
    await addDoc(userProfileRef, {
      ...profile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  } else {
    // Update existing profile
    const profileRef = doc(db, 'userProfile', snapshot.docs[0].id)
    await updateDoc(profileRef, {
      ...profile,
      updatedAt: serverTimestamp()
    })
  }
}
