import React from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

export function MarketPricesSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Skeleton className="h-6 w-40 mb-4" /> {/* Title */}
      <div className="space-y-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-4 w-32" /> {/* Crop name */}
              <Skeleton className="h-4 w-24" /> {/* Price */}
            </div>
          ))}
      </div>
    </div>
  );
}
