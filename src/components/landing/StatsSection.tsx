'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StatsResponse } from '@/types';

export default function StatsSection() {
  const [stats, setStats] = useState<StatsResponse>({
    productCount: 15420,
    sellerCount: 2350,
    orderCount: 89400,
    avgRating: 4.8
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/stats`
        );
        if (response.data?.data) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats', error);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    { label: 'Active Products', value: stats.productCount.toLocaleString() + '+' },
    { label: 'Verified Sellers', value: stats.sellerCount.toLocaleString() },
    { label: 'Successful Orders', value: stats.orderCount.toLocaleString() + '+' },
    { label: 'Average Rating', value: stats.avgRating.toFixed(1) + '/5' }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-600 rounded-full filter blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-600 rounded-full filter blur-3xl mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center border-y border-white/10 py-12 backdrop-blur-sm bg-white/5 rounded-3xl shadow-2xl">
          {statItems.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4">
              <span className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-[#4F46E5] mb-2 drop-shadow-lg">
                {stat.value}
              </span>
              <span className="text-sm md:text-base font-medium text-gray-400 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
