"use client";

import React from "react";
import Link from "next/link";
import UserProfileDropdown from "@/app/components/UserProfileDropdown";

interface HeaderProps {
  pageTitle?: string;
}

export function Header({ pageTitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <span className="font-bold">Nkumbi</span>
          </Link>
          {pageTitle && (
            <h1 className="text-lg font-semibold cursor-pointer">
              {pageTitle}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-4">
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
}
