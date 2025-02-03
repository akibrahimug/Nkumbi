import React from "react";
import { Skeleton } from "@/app/components/ui/Skeleton";

export function DashboardSkeleton() {
  const quickAccessButtons = Array(7).fill(0);

  return (
    <div className="min-h-screen bg-[#F4F1DE]">
      <header className="bg-[#2C5F2D] p-4 flex flex-col sm:flex-row justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </header>

      <nav className="bg-[#F4F1DE] p-4">
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-4 max-w-7xl mx-auto">
          {quickAccessButtons.map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow"
            >
              <Skeleton className="h-6 w-6 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </nav>

      <div className="p-4 space-y-4 max-w-7xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow">
          <Skeleton className="h-32 w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <Skeleton className="h-48 w-full" />
              </div>
            ))}

          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <Skeleton className="h-64 w-full" />
                </div>
              ))}
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow">
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
