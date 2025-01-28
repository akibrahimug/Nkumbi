"use client";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import UserProfileDropdown from "../../components/UserProfileDropdown";
import NotificationDropdown from "../../components/NotificationDropdown";
import UserAvatarWidget from "../../components/UserAvatarWidget";
import { useSession } from "next-auth/react";

export default function ProfileSettingsPage() {
  const { data: session } = useSession();
  const currentUser = session?.user;
  const handleSaveChanges = () => {
    console.log("Save changes");
  };
  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/profile" className="mr-4">
            <ArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
        </div>
        <div className="flex items-center space-x-4">
          <NotificationDropdown />
          <UserProfileDropdown />
        </div>
      </header>
      <main className="p-4 space-y-4">
        <UserAvatarWidget />
        <div className="bg-white p-6 rounded-lg shadow">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={currentUser?.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2C5F2D] focus:ring focus:ring-[#2C5F2D] focus:ring-opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                Avatar
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="mt-1 block w-full"
              />
            </div>
            <button
              onClick={handleSaveChanges}
              type="submit"
              className="inline-flex items-center bg-[#2C5F2D] text-white px-4 py-2 rounded-md hover:bg-[#1F4F1F] transition-colors"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
