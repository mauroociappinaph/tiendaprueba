import React from "react";
import { Card } from "./Card";

const SkeletonBar: React.FC<{ width: string; height?: string }> = ({
  width,
  height = "h-4",
}) => (
  <div className={`animate-pulse bg-gray-200 rounded ${width} ${height}`}></div>
);

const ProductSkeletonCard = () => (
  <div className="bg-white border border-border rounded-xl p-4 flex flex-col justify-between">
    <div className="mb-4 text-center space-y-3">
      <SkeletonBar width="w-3/4 mx-auto" />
      <SkeletonBar width="w-1/2 mx-auto" height="h-7" />
      <SkeletonBar width="w-full mx-auto" height="h-10" />
    </div>
    <SkeletonBar width="w-full" height="h-10" />
  </div>
);

export const ProductListSkeleton = () => {
  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductSkeletonCard key={index} />
        ))}
      </div>
    </Card>
  );
};
