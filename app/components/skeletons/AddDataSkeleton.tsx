import { Skeleton } from "@/app/components/ui/skeleton";
import React from "react";
export function AddDataSkeleton() {
  return (
    <div className="min-h-screen bg-[#F4F1DE] py-8">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-2 w-full" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
