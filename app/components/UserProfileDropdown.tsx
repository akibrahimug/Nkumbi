'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'
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
  email: string;
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
    email: "jane.farmer@example.com",
    listingsCount: 5,
    postsCount: 12
  }

  // Uncomment the following line to simulate a logged-out state
  // return null;
}

export default function UserProfileDropdown() {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Image
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            className="rounded-full"
            width={32}
            height={32}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
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
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

