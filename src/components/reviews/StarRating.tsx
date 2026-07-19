'use client';

import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
}

export default function StarRating({
  rating,
  maxRating = 5,
  onChange,
  size = 'md',
  readOnly = true,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
  };

  const handleMouseEnter = (index: number) => {
    if (!readOnly) setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (!readOnly) setHoverRating(0);
  };

  const handleClick = (index: number) => {
    if (!readOnly && onChange) {
      onChange(index);
    }
  };

  return (
    <div className="flex items-center space-x-1" onMouseLeave={handleMouseLeave}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const index = i + 1;
        const isFilled = index <= (hoverRating || rating);
        return (
          <FiStar
            key={i}
            className={`${sizeClasses[size]} transition-all duration-200 ${
              isFilled ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
            } ${!readOnly ? 'cursor-pointer hover:scale-110' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
}
