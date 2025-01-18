import Link from 'next/link'
import Image from 'next/image'
import { User, Settings, LogOut } from 'lucide-react'

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

export default async function UserProfileWidget() {
  const user = await fetchUserProfile()

  if (!user) {
    return null // Don't render anything if the user is not logged in
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center space-x-4">
        <Image
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <div className="text-sm text-gray-600">
            <span className="mr-3">{user.listingsCount} listings</span>
            <span>{user.postsCount} posts</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <Link 
          href="/profile" 
          className="text-[#2C5F2D] hover:underline flex items-center"
        >
          <User className="w-4 h-4 mr-1" />
          View Profile
        </Link>
        <Link 
          href="/profile/settings" 
          className="text-[#2C5F2D] hover:underline flex items-center"
        >
          <Settings className="w-4 h-4 mr-1" />
          Settings
        </Link>
        <button 
          className="text-red-600 hover:underline flex items-center"
          onClick={() => {/* Implement logout functionality */}}
        >
          <LogOut className="w-4 h-4 mr-1" />
          Logout
        </button>
      </div>
    </div>
  )
}

