"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Settings, ShoppingBag, MessageSquare } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { selectUser } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";

type UserProfile = {
  name: string;
  avatar: string;
  listingsCount: number;
  postsCount: number;
};

export default function UserAvatarWidget() {
  const user = useSelector(selectUser);

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
  );
}
