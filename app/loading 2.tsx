import React from "react";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

export default function Loading(num: number) {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton number={num} />;
}
