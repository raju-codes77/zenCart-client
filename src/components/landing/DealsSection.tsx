'use client';

import React from 'react';
import Link from 'next/link';
import { FiClock, FiArrowRight } from 'react-icons/fi';

export default function DealsSection() {
  return (
    <section className="py-16 my-10 relative overflow-hidden">
      {/* Background with modern gradients */}
      <div className="absolute inset-0 bg-[#F59E0B]"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white rounded-full opacity-10 filter blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black rounded-full opacity-10 filter blur-2xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="lg:w-1/2 text-white text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6 border border-white/30">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span>Limited Time Offer</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-sm">
              Flash Sale: Up to <span className="text-yellow-200">50% Off</span>
            </h2>
            
            <p className="text-lg text-amber-50 mb-8 max-w-xl mx-auto lg:mx-0 font-medium">
              Grab the best deals on electronics, fashion, and home goods. These exclusive discounts won't last long!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="flex space-x-4">
                <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm rounded-xl p-3 w-20 border border-white/10">
                  <span className="text-3xl font-bold">12</span>
                  <span className="text-xs uppercase tracking-wider">Hours</span>
                </div>
                <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm rounded-xl p-3 w-20 border border-white/10">
                  <span className="text-3xl font-bold">45</span>
                  <span className="text-xs uppercase tracking-wider">Mins</span>
                </div>
                <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm rounded-xl p-3 w-20 border border-white/10">
                  <span className="text-3xl font-bold">30</span>
                  <span className="text-xs uppercase tracking-wider">Secs</span>
                </div>
              </div>
            </div>

            <Link href="/shop?sale=true" className="inline-flex items-center space-x-2 bg-white text-amber-600 hover:bg-gray-50 px-8 py-3.5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <span>Shop the Sale</span>
              <FiArrowRight />
            </Link>
          </div>

          {/* Right visual element */}
          <div className="lg:w-1/2 w-full max-w-lg mx-auto mt-10 lg:mt-0 relative">
            <div className="relative z-10 grid grid-cols-2 gap-4 transform rotate-2">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-2xl transform -translate-y-6 hover:-translate-y-8 transition-transform duration-300 cursor-pointer">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300" alt="Sneakers" className="w-full h-40 object-cover rounded-xl mb-3" />
                <h4 className="font-bold text-gray-900 truncate">Nike Air Max</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-amber-600 font-bold">$120</span>
                  <span className="text-sm text-gray-400 line-through">$180</span>
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-2xl transform translate-y-6 hover:translate-y-4 transition-transform duration-300 cursor-pointer">
                <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=300" alt="Watch" className="w-full h-40 object-cover rounded-xl mb-3" />
                <h4 className="font-bold text-gray-900 truncate">Apple Watch Series</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-amber-600 font-bold">$299</span>
                  <span className="text-sm text-gray-400 line-through">$399</span>
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold shadow-lg z-20 animate-bounce">
              -40%
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
