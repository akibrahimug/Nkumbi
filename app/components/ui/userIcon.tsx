import type React from "react";
import Image from "next/image";

interface UserIconProps {
  firstName: string;
  profilePicture?: string;
  size?: number;
}

const UserIcon: React.FC<UserIconProps> = ({
  firstName,
  profilePicture,
  size = 40,
}) => {
  const firstLetter = firstName.charAt(0).toUpperCase();

  const commonClasses =
    "rounded-full transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg";

  if (profilePicture) {
    return (
      <div
        className={`${commonClasses} overflow-hidden`}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <Image
          src={profilePicture || "/placeholder.svg"}
          alt={`${firstName}'s profile`}
          width={size}
          height={size}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${commonClasses} flex items-center justify-center bg-black text-white border-2 border-white`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <span className="text-lg font-semibold">{firstLetter}</span>
    </div>
  );
};

export default UserIcon;
