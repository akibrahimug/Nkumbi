import React from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

export function QuickAccessSkeleton() {
  const quickAccessButtons = Array(7).fill(0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-7 gap-4 max-w-7xl mx-auto">
      {quickAccessButtons.map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow"
        >
          <Skeleton className="h-6 w-6 mb-2" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}
