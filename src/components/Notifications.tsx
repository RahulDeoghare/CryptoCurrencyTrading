import * as React from 'react';
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Bell, X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function NotificationsDialog() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Welcome',
      message: 'Welcome to TradeSmart! Start trading Indian stocks today.',
      time: new Date().toISOString(),
      read: false
    }
  ]);

  useEffect(() => {
    const handleNewNotification = (event: CustomEvent<{ title: string; message: string; time: string }>) => {
      const { title, message, time } = event.detail;
      setNotifications(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        title,
        message,
        time,
        read: false
      }, ...prev]);
    };

    window.addEventListener('newNotification', handleNewNotification as EventListener);
    return () => {
      window.removeEventListener('newNotification', handleNewNotification as EventListener);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-gray-400 hover:text-white relative">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-xl font-bold text-white">
                Notifications
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>
            
            <div className="flex justify-between mb-4">
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-500 hover:text-blue-400"
              >
                Mark all as read
              </button>
              <button
                onClick={clearAll}
                className="text-sm text-red-500 hover:text-red-400"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-center text-gray-400 py-4">No notifications</p>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      notification.read ? 'bg-gray-700' : 'bg-gray-700/50'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-white">{notification.title}</h3>
                      <span className="text-xs text-gray-400">{formatTime(notification.time)}</span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}