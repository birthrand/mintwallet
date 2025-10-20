import { Outlet, NavLink } from 'react-router-dom'
import { Home, WalletMinimal, Receipt, CreditCard, BarChart2 } from 'lucide-react'
import { bills } from '@/data/mockData'

export function MobileShell() {
  const unpaidBillsCount = bills.filter(bill => bill.status === 'unpaid').length
  
  return (
    <div className="min-h-dvh bg-[radial-gradient(50%_50%_at_100%_0%,#fff6fb_0%,transparent_60%),radial-gradient(40%_40%_at_0%_100%,#eafff0_0%,transparent_60%)]">
      <div className="mx-auto max-w-[430px] min-h-dvh flex flex-col">
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <nav className="sticky bottom-0 w-full">
          <div className="mx-auto max-w-[430px] m-4 rounded-2xl glass flex items-center justify-around py-3">
            <Tab to="/transactions" icon={<Receipt size={22} />} label="Transactions" />
            <Tab to="/bills" icon={<CreditCard size={22} />} label="Bills" badge={unpaidBillsCount > 0 ? unpaidBillsCount : undefined} />
            <Tab to="/" icon={<Home size={22} />} label="Home" />
            <Tab to="/budget" icon={<BarChart2 size={22} />} label="Budget" />
            <Tab to="/wallet" icon={<WalletMinimal size={22} />} label="Wallet" />
          </div>
        </nav>
      </div>
    </div>
  )
}

function Tab({ to, icon, label, badge }: { 
  to: string; 
  icon: React.ReactElement; 
  label: string; 
  badge?: number;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 px-2 text-xs transition-all duration-200 ${
          isActive 
            ? 'text-neutral-900 scale-105' 
            : 'text-neutral-500 hover:text-neutral-700'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className={`relative w-10 h-10 rounded-xl grid place-items-center transition-all duration-200 ${
            isActive 
              ? 'bg-gradient-to-r from-pink-200 to-green-200 shadow-lg' 
              : 'bg-white/70 shadow-soft'
          }`}>
            {icon}
            {badge && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {badge}
              </div>
            )}
          </div>
          <span className="font-medium">{label}</span>
        </>
      )}
    </NavLink>
  )
}

export default MobileShell


