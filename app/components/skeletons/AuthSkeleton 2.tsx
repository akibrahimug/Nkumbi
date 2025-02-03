import { Skeleton } from "@/app/components/ui/skeleton";
import React from "react";
export function AuthSkeleton() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          <Skeleton className="h-10 w-full mt-6" />
          <Skeleton className="h-4 w-48 mx-auto" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
