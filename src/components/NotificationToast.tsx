import { useNotification } from '../context/NotificationContext'

function NotificationToast() {
  const { notification } = useNotification()

  if (!notification) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`rounded-2xl px-6 py-4 shadow-lg ${
          notification.type === 'error'
            ? 'bg-red-500 text-white'
            : 'bg-emerald-500 text-white'
        }`}
      >
        {notification.message}
      </div>
    </div>
  )
}

export default NotificationToast