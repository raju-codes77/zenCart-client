'use client';

import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-2xl">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Image */}
      <div className="w-full h-96 md:h-[500px] bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm border border-gray-100 p-4">
        <img
          src={images[activeIndex]}
          alt={`Product Image ${activeIndex + 1}`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-gray-50 p-1 ${
                activeIndex === index
                  ? 'border-primary-600 opacity-100'
                  : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
