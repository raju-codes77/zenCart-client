'use client';

import React from 'react';
import StarRating from './StarRating';

interface User {
  name: string;
  avatar?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: User;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center text-white font-bold shadow-md">
            {review.user?.avatar ? (
              <img src={review.user.avatar} alt={review.user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              review.user?.name?.charAt(0).toUpperCase() || 'U'
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{review.user?.name || 'Anonymous'}</h4>
            <span className="text-xs text-gray-400">{date}</span>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" readOnly />
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mt-2">{review.comment}</p>
    </div>
  );
}
