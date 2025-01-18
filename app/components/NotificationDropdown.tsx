'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Notification = {
  id: number;
  type: 'price_change' | 'new_offer' | 'community_event';
  message: string;
  link: string;
  read: boolean;
}

async function fetchNotifications(): Promise<Notification[]> {
  // In a real application, this would be an API call
  // For demonstration, we'll simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return [
    { id: 1, type: 'price_change', message: 'Maize prices have increased by 5%', link: '/market-prices', read: false },
    { id: 2, type: 'new_offer', message: 'New offer: Bulk purchase of coffee beans', link: '/marketplace/coffee', read: false },
    { id: 3, type: 'community_event', message: 'Upcoming workshop: Sustainable Farming Practices', link: '/community/events', read: false },
  ]
}

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNotifications()
      setNotifications(data)
      setUnreadCount(data.filter(n => !n.read).length)
    }
    fetchData()

    // Set up a polling mechanism to check for updates every 30 seconds
    const intervalId = setInterval(fetchData, 30000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <DropdownMenuItem>No new notifications</DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} asChild>
              <Link 
                href={notification.link} 
                className={`block py-2 px-4 hover:bg-gray-100 ${notification.read ? 'text-gray-600' : 'font-semibold'}`}
                onClick={() => markAsRead(notification.id)}
              >
                {notification.message}
              </Link>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

