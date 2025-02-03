import React from "react";
interface SkeletonProps {
  className?: string;
}
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-lg ${className}`}
      {...props}
    />
  );
}

export { Skeleton };
