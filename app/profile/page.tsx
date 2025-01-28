"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, MessageSquare, Settings } from "lucide-react";
import UserProfileDropdown from "@/app/components/UserProfileDropdown";
import NotificationDropdown from "@/app/components/NotificationDropdown";
import UserAvatarWidget from "@/app/components/UserAvatarWidget";
import { useSession } from "next-auth/react";

type UserProfile = {
  name: string;
  avatar: string;
  email: string;
  location: string;
  joinDate: string;
  listingsCount: number;
  postsCount: number;
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const { data: session } = useSession();

  const currentUser = session?.user;
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // In a real application, this would be an API call
        // For demonstration, we'll simulate an API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const data: UserProfile = {
          name: currentUser?.name || "Guest User",
          avatar:
            currentUser?.avatar || "/placeholder.svg?height=200&width=200",
          email: currentUser?.email || "guest@example.com",
          location: currentUser?.location || "Unknown Location",
          joinDate: "January 2023",
          listingsCount: 5,
          postsCount: 12,
        };

        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold">User Profile</h1>
        </div>
        <div className="flex items-center space-x-4">
          <NotificationDropdown />
          <UserProfileDropdown />
        </div>
      </header>
      <main className="p-4 space-y-4">
        <UserAvatarWidget />
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <Image
              src={profileData.avatar || "/placeholder.svg"}
              alt={profileData.name}
              width={200}
              height={200}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold mb-2">{profileData.name}</h2>
              <p className="text-gray-600 mb-1">{profileData.email}</p>
              <p className="text-gray-600 mb-1">{profileData.location}</p>
              <p className="text-gray-600 mb-4">
                Joined: {profileData.joinDate}
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-1 text-[#2C5F2D]" />
                  <span>{profileData.listingsCount} listings</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-1 text-[#2C5F2D]" />
                  <span>{profileData.postsCount} posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          {/* Add recent activity content here */}
          <p>No recent activity to display.</p>
        </div>
        <Link
          href="/profile/settings"
          className="inline-flex items-center bg-[#2C5F2D] text-white px-4 py-2 rounded-md hover:bg-[#1F4F1F] transition-colors"
        >
          <Settings className="w-5 h-5 mr-2" />
          Edit Profile Settings
        </Link>
      </main>
    </div>
  );
}
