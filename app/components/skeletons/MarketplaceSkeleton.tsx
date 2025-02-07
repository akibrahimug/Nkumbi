import React from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

export function MarketplaceSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Skeleton className="h-6 w-40 mb-4" /> {/* Title */}
      <div className="grid grid-cols-2 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-32 w-full rounded-md" />{" "}
              {/* Product image */}
              <Skeleton className="h-4 w-3/4" /> {/* Product name */}
              <Skeleton className="h-4 w-1/2" /> {/* Price */}
            </div>
          ))}
      </div>
    </div>
  );
}
