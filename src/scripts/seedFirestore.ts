import { 
  addCard,
  addGoal,
  addBill,
  addTransaction,
  addBudget,
  addNotification,
  updateUserProfile
} from '@/services/firestore.service'
import { 
  cards as mockCards,
  goals as mockGoals,
  bills as mockBills,
  transactions as mockTransactions,
  budgets as mockBudgets,
  notifications as mockNotifications,
  userProfile as mockUserProfile
} from '@/data/mockData'

export const seedFirestore = async () => {
  try {
    console.log('Starting to seed Firestore database...')

    // Add cards
    console.log('Adding cards...')
    for (const card of mockCards) {
      const { id, ...cardData } = card
      await addCard(cardData)
    }

    // Add goals
    console.log('Adding goals...')
    for (const goal of mockGoals) {
      const { id, ...goalData } = goal
      await addGoal(goalData)
    }

    // Add bills
    console.log('Adding bills...')
    for (const bill of mockBills) {
      const { id, ...billData } = bill
      await addBill(billData)
    }

    // Add transactions
    console.log('Adding transactions...')
    for (const transaction of mockTransactions) {
      const { id, ...transactionData } = transaction
      await addTransaction(transactionData)
    }

    // Add budgets
    console.log('Adding budgets...')
    for (const budget of mockBudgets) {
      const { id, ...budgetData } = budget
      await addBudget(budgetData)
    }

    // Add notifications
    console.log('Adding notifications...')
    for (const notification of mockNotifications) {
      const { id, ...notificationData } = notification
      await addNotification(notificationData)
    }

    // Update user profile
    console.log('Updating user profile...')
    const { id, ...userData } = mockUserProfile
    await updateUserProfile(userData)

    console.log('✅ Successfully seeded Firestore database!')
  } catch (error) {
    console.error('❌ Error seeding Firestore database:', error)
  }
}

// Run the seed function if this file is executed directly
if (typeof window === 'undefined') {
  seedFirestore()
}
