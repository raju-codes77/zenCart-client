import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200 w-full"></div>
      <div className="p-4 flex flex-col gap-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="flex flex-col gap-1.5">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-5 bg-gray-200 rounded-full w-16"></div>
        </div>
      </div>
    </div>
  );
};
