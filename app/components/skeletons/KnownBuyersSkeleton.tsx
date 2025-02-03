import React from "react";
import { Skeleton } from "@/app/components/ui/Skeleton";

export function KnownBuyersSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Skeleton className="h-6 w-40 mb-4" /> {/* Title */}
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex items-center mb-4 last:mb-0">
            <Skeleton className="h-12 w-12 rounded-full mr-4" />{" "}
            {/* Buyer avatar */}
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-2" /> {/* Buyer name */}
              <Skeleton className="h-3 w-48" /> {/* Buyer details */}
            </div>
            <Skeleton className="h-8 w-24" /> {/* Contact button */}
          </div>
        ))}
    </div>
  );
}
