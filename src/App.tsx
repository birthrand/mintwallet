import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import { LoadingScreen } from './components/ui/LoadingSpinner'
import { MobileShell } from './layouts/MobileShell'
import Home from './routes/home'
import Bills from './routes/bills'
import Transactions from './routes/transactions'
import Wallet from './routes/wallet'
import Budget from './routes/budget'
import Profile from './routes/profile'
import Search from './routes/search'
import Notifications from './routes/notifications'
import Reports from './routes/reports'

// Goal management
import GoalDetails from './routes/goal-details'
import GoalForm from './routes/goal-form'

// Card management
import CardDetails from './routes/card-details'
import CardForm from './routes/card-form'

// Transaction management
import TransactionDetails from './routes/transaction-details'
import TransactionForm from './routes/transaction-form'

// Bill management
import BillDetails from './routes/bill-details'
import BillForm from './routes/bill-form'

// Budget management
import BudgetDetails from './routes/budget-details'
import BudgetForm from './routes/budget-form'

const router = createBrowserRouter([
  {
    element: <MobileShell />,
    children: [
      // Main navigation routes
      { path: '/', element: <Home /> },
      { path: '/bills', element: <Bills /> },
      { path: '/transactions', element: <Transactions /> },
      { path: '/wallet', element: <Wallet /> },
      { path: '/budget', element: <Budget /> },
      { path: '/profile', element: <Profile /> },
      { path: '/search', element: <Search /> },
      { path: '/notifications', element: <Notifications /> },
      { path: '/reports', element: <Reports /> },
      
      // Goal management routes
      { path: '/goals/:id', element: <GoalDetails /> },
      { path: '/goals/new', element: <GoalForm /> },
      { path: '/goals/:id/edit', element: <GoalForm /> },
      
      // Card management routes
      { path: '/cards/:id', element: <CardDetails /> },
      { path: '/cards/new', element: <CardForm /> },
      { path: '/cards/:id/edit', element: <CardForm /> },
      
      // Transaction management routes
      { path: '/transactions/:id', element: <TransactionDetails /> },
      { path: '/transactions/new', element: <TransactionForm /> },
      { path: '/transactions/:id/edit', element: <TransactionForm /> },
      
      // Bill management routes
      { path: '/bills/:id', element: <BillDetails /> },
      { path: '/bills/new', element: <BillForm /> },
      { path: '/bills/:id/edit', element: <BillForm /> },
      
      // Budget management routes
      { path: '/budgets/:id', element: <BudgetDetails /> },
      { path: '/budgets/new', element: <BudgetForm /> },
      { path: '/budgets/:id/edit', element: <BudgetForm /> },
    ],
  },
])

// Component to handle loading state
function AppContent() {
  const { loading } = useApp()
  
  if (loading) {
    return <LoadingScreen />
  }
  
  return <RouterProvider router={router} />
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}


