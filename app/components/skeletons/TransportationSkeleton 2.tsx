import React from "react";
import { Skeleton } from "@/app/components/ui/Skeleton";

export function TransportationSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Skeleton className="h-6 w-40 mb-4" /> {/* Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Skeleton className="h-10 w-10 rounded-md mr-3" />{" "}
                {/* Vehicle icon */}
                <Skeleton className="h-4 w-32" /> {/* Transport type */}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" /> {/* Route */}
                <Skeleton className="h-4 w-24" /> {/* Price */}
                <Skeleton className="h-8 w-32" /> {/* Book button */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
