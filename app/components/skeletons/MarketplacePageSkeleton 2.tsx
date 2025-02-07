import React from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

export function MarketplacePageSkeleton() {
  return (
    <div className="min-h-screen bg-[#F4F1DE] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-48" /> {/* Page title */}
          <Skeleton className="h-10 w-32" /> {/* Add listing button */}
        </div>
        <div className="flex gap-4 mb-6">
          <Skeleton className="h-10 w-40" /> {/* Filter */}
          <Skeleton className="h-10 w-48" /> {/* Search */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(9)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <Skeleton className="h-48 w-full rounded-md mb-4" />{" "}
                {/* Product image */}
                <Skeleton className="h-6 w-3/4 mb-2" /> {/* Product name */}
                <Skeleton className="h-5 w-1/3 mb-3" /> {/* Price */}
                <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-24" /> {/* Contact button */}
                  <Skeleton className="h-8 w-24" /> {/* Details button */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
