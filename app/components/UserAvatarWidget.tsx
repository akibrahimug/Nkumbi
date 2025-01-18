'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User, Settings, ShoppingBag, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type UserProfile = {
  name: string;
  avatar: string;
  listingsCount: number;
  postsCount: number;
}

async function fetchUserProfile(): Promise<UserProfile | null> {
  // In a real application, this would be an API call to check if the user is logged in
  // and fetch their profile data
  // For demonstration, we'll simulate an API delay and return a mock user
  await new Promise(resolve => setTimeout(resolve, 500))

  // Simulating a logged-in user
  return {
    name: "Jane Farmer",
    avatar: "/placeholder.svg?height=100&width=100",
    listingsCount: 5,
    postsCount: 12
  }

  // Uncomment the following line to simulate a logged-out state
  // return null;
}

export default function UserAvatarWidget() {
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserProfile()
      setUser(data)
    }
    fetchData()

    // Set up a polling mechanism to check for updates every 30 seconds
    const intervalId = setInterval(fetchData, 30000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  if (!user) {
    return null // Don't render anything if the user is not logged in
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                View profile
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="text-center sm:text-left">
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-600">
          <span className="flex items-center justify-center sm:justify-start">
            <ShoppingBag className="w-4 h-4 mr-1" />
            {user.listingsCount} listings
          </span>
          <span className="flex items-center justify-center sm:justify-start">
            <MessageSquare className="w-4 h-4 mr-1" />
            {user.postsCount} posts
          </span>
        </div>
      </div>
    </div>
  )
}

