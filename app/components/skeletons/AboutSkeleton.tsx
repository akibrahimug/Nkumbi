import { Skeleton } from "@/app/components/ui/skeleton";
import React from "react";
export function AboutSkeleton() {
  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
        <Skeleton className="w-8 h-8 mr-4" />
        <Skeleton className="h-8 w-32" />
      </header>
      <main className="p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            <Skeleton className="h-8 w-48 mt-6" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
