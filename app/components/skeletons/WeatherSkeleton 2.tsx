import React from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

export function WeatherSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Skeleton className="h-6 w-32 mb-4" /> {/* Location */}
      <div className="flex items-center mb-4">
        <Skeleton className="h-16 w-16 rounded-full mr-4" />{" "}
        {/* Weather icon */}
        <Skeleton className="h-10 w-24" /> {/* Temperature */}
      </div>
      <div className="space-y-2">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" /> {/* Weather detail label */}
              <Skeleton className="h-4 w-16" /> {/* Weather detail value */}
            </div>
          ))}
      </div>
    </div>
  );
}
