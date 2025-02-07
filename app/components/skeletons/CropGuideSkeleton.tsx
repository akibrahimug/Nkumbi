import React from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

export function CropGuideSkeleton() {
  return (
    <div className="min-h-screen bg-[#F4F1DE] p-6">
      <div className="max-w-7xl mx-auto">
        <Skeleton className="h-8 w-48 mb-6" /> {/* Page title */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <Skeleton className="h-40 w-full rounded-md mb-4" />{" "}
                {/* Crop image */}
                <Skeleton className="h-6 w-32 mb-3" /> {/* Crop name */}
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <Skeleton className="h-8 w-32" /> {/* Learn more button */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
