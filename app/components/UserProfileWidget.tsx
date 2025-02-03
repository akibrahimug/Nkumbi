import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";
import { selectUser } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import UserIcon from "@/app/components/ui/userIcon";
export default function UserProfileWidget() {
  const user = useSelector(selectUser);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center space-x-4">
        <UserIcon
          firstName={user?.name || ""}
          profilePicture={user?.avatar}
          size={32}
        />
        <div>
          <h2 className="font-semibold text-lg">{user?.name}</h2>
          <div className="text-sm text-gray-600">
            {/* <span className="mr-3">{user?.listingsCount || 0} listings</span>
            <span>{user?.postsCount || 0} posts</span> */}
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
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4 mr-1" />
          Logout
        </button>
      </div>
    </div>
  );
}
