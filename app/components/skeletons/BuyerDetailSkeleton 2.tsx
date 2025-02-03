import { Skeleton } from "@/app/components/ui/skeleton";
import React from "react";
export function BuyerDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
        <Skeleton className="w-8 h-8 mr-4" />
        <Skeleton className="h-8 w-32" />
      </header>
      <main className="p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </main>
    </div>
  );
}
