"use client";

interface LoadingSkeletonProps {
  title: string;
  numberOfItems?: number;
  showViewAll?: boolean;
}

const LoadingSkeleton = ({ 
  title, 
  numberOfItems = 8,
  showViewAll = false 
}: LoadingSkeletonProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-poppins font-semibold text-[#003B71] text-2xl sm:text-xl">
          {title}
        </h2>
        {showViewAll && (
          <button className="text-sm text-[#00366B] font-medium hover:underline">
            View all
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-3">
        {Array.from({ length: numberOfItems }).map((_, i) => (
          <div
            key={i}
            className="h-56 bg-gray-200 animate-pulse rounded-2xl sm:h-48"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
