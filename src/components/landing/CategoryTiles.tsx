'use client';

import React from 'react';
import Link from 'next/link';
import { FiMonitor, FiBriefcase, FiHome, FiSmile, FiBookOpen, FiCoffee } from 'react-icons/fi';

const categories = [
  { id: 'electronics', name: 'Electronics', icon: FiMonitor, color: 'bg-blue-500', bg: 'bg-blue-50' },
  { id: 'fashion', name: 'Fashion', icon: FiBriefcase, color: 'bg-pink-500', bg: 'bg-pink-50' },
  { id: 'home', name: 'Home & Living', icon: FiHome, color: 'bg-emerald-500', bg: 'bg-emerald-50' },
  { id: 'beauty', name: 'Beauty', icon: FiSmile, color: 'bg-purple-500', bg: 'bg-purple-50' },
  { id: 'books', name: 'Books', icon: FiBookOpen, color: 'bg-amber-500', bg: 'bg-amber-50' },
  { id: 'kitchen', name: 'Kitchen', icon: FiCoffee, color: 'bg-orange-500', bg: 'bg-orange-50' },
];

export default function CategoryTiles() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Shop by Category</h2>
          <div className="mt-2 w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link href={`/shop?category=${cat.id}`} key={cat.id} className="group relative">
                <div className={`absolute inset-0 ${cat.bg} rounded-2xl transform transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2 opacity-0 group-hover:opacity-100 z-0`}></div>
                <div className="relative z-10 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-100 group-hover:border-transparent group-hover:shadow-lg transition-all duration-300">
                  <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                    {cat.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
