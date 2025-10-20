import { Header } from '@/components/ui/Header'
import Card from '@/components/ui/card'
import { FormButton } from '@/components/ui/FormButton'
import { useApp } from '@/context/AppContext'
import { ChevronRight, User, Settings, Shield, Info, LogOut } from 'lucide-react'

export default function Profile() {
  const { userProfile } = useApp()

  const settingsSections = [
    {
      title: 'Account',
      icon: <User size={20} />,
      description: 'Personal information and preferences',
      onClick: () => console.log('Account settings')
    },
    {
      title: 'Preferences',
      icon: <Settings size={20} />,
      description: 'App settings and notifications',
      onClick: () => console.log('Preferences')
    },
    {
      title: 'Security',
      icon: <Shield size={20} />,
      description: 'Password and security settings',
      onClick: () => console.log('Security')
    },
    {
      title: 'About',
      icon: <Info size={20} />,
      description: 'App version and support',
      onClick: () => console.log('About')
    }
  ]

  return (
    <div className="space-y-6">
      <Header name={userProfile.name} />

      {/* User Info Card */}
      <Card variant="gradient" className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-200 to-green-200 flex items-center justify-center text-2xl">
            {userProfile.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-neutral-900">{userProfile.name}</h2>
            <p className="text-neutral-600">{userProfile.email}</p>
            <p className="text-sm text-neutral-500">{userProfile.phone}</p>
          </div>
        </div>
      </Card>

      {/* Settings Sections */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-neutral-900 px-1">Settings</h3>
        {settingsSections.map((section, index) => (
          <Card
            key={index}
            className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={section.onClick}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center text-neutral-600">
                {section.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-neutral-900">{section.title}</h4>
                <p className="text-sm text-neutral-500">{section.description}</p>
              </div>
              <ChevronRight size={20} className="text-neutral-400" />
            </div>
          </Card>
        ))}
      </div>

      {/* Logout Button */}
      <div className="pt-4">
        <FormButton
          variant="danger"
          className="w-full"
          onClick={() => {
            // Handle logout logic
            console.log('Logout')
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <LogOut size={20} />
            Logout
          </div>
        </FormButton>
      </div>
    </div>
  )
}
