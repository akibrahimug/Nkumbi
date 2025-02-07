import React from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

export function AskFarmingAISkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Skeleton className="h-8 w-48 mb-4" /> {/* Title */}
      <Skeleton className="h-12 w-full mb-4" /> {/* Input field */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-24" /> {/* Button */}
      </div>
    </div>
  );
}
