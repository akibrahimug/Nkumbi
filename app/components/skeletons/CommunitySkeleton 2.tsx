import React from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

export function CommunitySkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Skeleton className="h-6 w-40 mb-4" /> {/* Title */}
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="mb-4 last:mb-0">
            <div className="flex items-center mb-2">
              <Skeleton className="h-8 w-8 rounded-full mr-2" /> {/* Avatar */}
              <Skeleton className="h-4 w-32" /> {/* Username */}
            </div>
            <Skeleton className="h-16 w-full" /> {/* Post content */}
          </div>
        ))}
    </div>
  );
}
