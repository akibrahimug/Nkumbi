import React from "react";
import { Skeleton } from "@/app/components/ui/Skeleton";

export function CommunityPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#F4F1DE] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-48" /> {/* Page title */}
          <Skeleton className="h-10 w-32" /> {/* New post button */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-4">
                    <Skeleton className="h-12 w-12 rounded-full mr-4" />{" "}
                    {/* Avatar */}
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" /> {/* Username */}
                      <Skeleton className="h-3 w-24" /> {/* Timestamp */}
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <Skeleton className="h-4 w-4/6 mb-4" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-20" /> {/* Like button */}
                    <Skeleton className="h-8 w-20" /> {/* Comment button */}
                  </div>
                </div>
              ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <Skeleton className="h-6 w-32 mb-4" /> {/* Trending title */}
            <div className="space-y-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
