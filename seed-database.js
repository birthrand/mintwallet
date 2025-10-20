// Simple script to seed the Firestore database with initial data
// Run with: node seed-database.js

import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore'

// Load environment variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
}

// Validate configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Missing Firebase configuration. Please ensure environment variables are set.')
  console.error('Required variables: VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID')
  process.exit(1)
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Sample data
const sampleCards = [
  {
    name: 'Primary Card Balance',
    balance: 20000,
    currency: 'USD',
    lastFour: '0123',
    expiry: '04/29',
    type: 'primary'
  },
  {
    name: 'Card Balance',
    balance: 10000,
    currency: 'USD',
    lastFour: '4567',
    expiry: '12/25',
    type: 'secondary'
  }
]

const sampleGoals = [
  {
    name: 'Vacations',
    target: 1000,
    current: 200,
    currency: 'USD',
    icon: '🏠',
    dueDate: '21st July, 2023'
  },
  {
    name: 'Emergency Fund',
    target: 5000,
    current: 1500,
    currency: 'USD',
    icon: '💰'
  }
]

const sampleBills = [
  {
    name: 'YouTube Premium',
    amount: 54,
    currency: 'USD',
    status: 'paid',
    dueDate: '2023-07-15',
    paymentMethod: 'Card',
    icon: '📺'
  },
  {
    name: 'Electricity',
    amount: 120,
    currency: 'USD',
    status: 'unpaid',
    dueDate: '2023-07-20',
    paymentMethod: 'Bank Transfer',
    icon: '⚡'
  }
]

const sampleTransactions = [
  {
    name: 'Coffee Shop',
    amount: -4.50,
    currency: 'USD',
    type: 'expense',
    category: 'Food & Dining',
    description: 'Morning coffee',
    date: '2023-07-10',
    icon: '☕'
  },
  {
    name: 'Salary',
    amount: 3000,
    currency: 'USD',
    type: 'income',
    category: 'Salary',
    description: 'Monthly salary',
    date: '2023-07-01',
    icon: '💰'
  }
]

const sampleBudgets = [
  {
    name: 'Groceries',
    total: 500,
    spent: 320,
    currency: 'USD',
    icon: '🛒',
    period: 'monthly'
  },
  {
    name: 'Entertainment',
    total: 200,
    spent: 150,
    currency: 'USD',
    icon: '🎬',
    period: 'monthly'
  }
]

const sampleNotifications = [
  {
    type: 'bill_due',
    title: 'Bill Due Soon',
    message: 'Your electricity bill is due in 3 days',
    read: false,
    timestamp: '2023-07-17T10:00:00Z',
    icon: '⚡'
  },
  {
    type: 'goal_achieved',
    title: 'Goal Achieved!',
    message: 'Congratulations! You reached your vacation goal',
    read: true,
    timestamp: '2023-07-15T14:30:00Z',
    icon: '🎉'
  }
]

const sampleUserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  currency: 'USD',
  timezone: 'UTC'
}

async function seedDatabase() {
  try {
    console.log('🌱 Starting to seed Firestore database...')

    // Add cards
    console.log('Adding cards...')
    for (const card of sampleCards) {
      await addDoc(collection(db, 'cards'), card)
    }

    // Add goals
    console.log('Adding goals...')
    for (const goal of sampleGoals) {
      await addDoc(collection(db, 'goals'), goal)
    }

    // Add bills
    console.log('Adding bills...')
    for (const bill of sampleBills) {
      await addDoc(collection(db, 'bills'), bill)
    }

    // Add transactions
    console.log('Adding transactions...')
    for (const transaction of sampleTransactions) {
      await addDoc(collection(db, 'transactions'), transaction)
    }

    // Add budgets
    console.log('Adding budgets...')
    for (const budget of sampleBudgets) {
      await addDoc(collection(db, 'budgets'), budget)
    }

    // Add notifications
    console.log('Adding notifications...')
    for (const notification of sampleNotifications) {
      await addDoc(collection(db, 'notifications'), notification)
    }

    // Add user profile
    console.log('Adding user profile...')
    await setDoc(doc(db, 'userProfile', 'default'), sampleUserProfile)

    console.log('✅ Successfully seeded Firestore database!')
    console.log('You can now run your app and see the data.')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
  }
}

seedDatabase()
