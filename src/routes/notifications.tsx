import { TopBar } from '@/components/ui/TopBar'
import Card from '@/components/ui/card'
import { FormButton } from '@/components/ui/FormButton'
import { IconBadge } from '@/components/ui/IconBadge'
import { EmptyState } from '@/components/ui/EmptyState'
import { useApp } from '@/context/AppContext'
import { Check, Trash2 } from 'lucide-react'

export default function Notifications() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } = useApp()

  const unreadCount = notifications.filter(n => !n.read).length

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const notificationTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return notificationTime.toLocaleDateString()
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'bill_due':
        return '⚡'
      case 'goal_achieved':
        return '🎉'
      case 'budget_exceeded':
        return '⚠️'
      case 'transaction_added':
        return '💳'
      default:
        return '📢'
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'bill_due':
        return 'text-orange-600'
      case 'goal_achieved':
        return 'text-green-600'
      case 'budget_exceeded':
        return 'text-red-600'
      case 'transaction_added':
        return 'text-blue-600'
      default:
        return 'text-neutral-600'
    }
  }

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id)
  }

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead()
  }

  const handleDelete = (id: string) => {
    deleteNotification(id)
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      notifications.forEach(notification => {
        deleteNotification(notification.id)
      })
    }
  }

  return (
    <div className="space-y-6">
      <TopBar 
        title="Notifications" 
        rightIcon={unreadCount > 0 ? <Check size={20} /> : undefined}
        onRightClick={unreadCount > 0 ? handleMarkAllAsRead : undefined}
        rightLabel={unreadCount > 0 ? 'Mark all read' : undefined}
      />

      {notifications.length === 0 ? (
        <EmptyState
          icon="🔔"
          title="No notifications"
          description="You're all caught up! New notifications will appear here."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              variant={notification.read ? 'default' : 'gradient'}
              className={`p-4 ${notification.read ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-3">
                <IconBadge
                  icon={getNotificationIcon(notification.type)}
                  variant="default"
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className={`font-medium ${getNotificationColor(notification.type)}`}>
                        {notification.title}
                      </h4>
                      <p className="text-sm text-neutral-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-neutral-400 mt-2">
                        {formatTimeAgo(notification.timestamp)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="p-1 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
                          title="Mark as read"
                        >
                          <Check size={16} className="text-neutral-400" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="p-1 hover:bg-red-100 rounded-lg transition-colors duration-200"
                        title="Delete notification"
                      >
                        <Trash2 size={16} className="text-neutral-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {notifications.length > 0 && (
        <div className="pt-4">
          <FormButton
            variant="secondary"
            className="w-full"
            onClick={handleClearAll}
          >
            <div className="flex items-center justify-center gap-2">
              <Trash2 size={16} />
              Clear All Notifications
            </div>
          </FormButton>
        </div>
      )}
    </div>
  )
}
