'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiArrowRight } from 'react-icons/fi';

const showcaseProducts = [
  { id: '1', title: 'Premium Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500', price: '$299' },
  { id: '2', title: 'Minimalist Smartwatch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=500', price: '$199' },
  { id: '3', title: 'Ergonomic Desk Chair', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=500', price: '$450' },
];

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showcaseProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text & Search */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Shop Smarter <br />
              <span className="text-transparent bg-clip-text bg-[#F59E0B]">
                with ZenCart
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 font-light">
              Discover quality products, secure checkout, and fast delivery—all in one place.
            </p>
            
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto lg:mx-0">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400 group-focus-within:text-primary-400 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-32 py-4 border-0 rounded-full text-gray-900 bg-white/95 backdrop-blur-sm placeholder-gray-400 focus:ring-4 focus:ring-primary-500/30 focus:bg-white shadow-2xl transition-all duration-300 text-lg"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute inset-y-1.5 right-1.5 bg-[#4F46E5] hover:bg-[#4338ca] text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center space-x-2"
                >
                  <span>Search</span>
                  <FiArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
            
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-400 font-medium pt-4">
              <span>Popular:</span>
              <button onClick={() => router.push('/shop?search=sneakers')} className="hover:text-white transition-colors">Sneakers</button>
              <button onClick={() => router.push('/shop?search=laptops')} className="hover:text-white transition-colors">Laptops</button>
              <button onClick={() => router.push('/shop?search=watches')} className="hover:text-white transition-colors">Watches</button>
            </div>
          </div>

          {/* Right Column: Showcase */}
          <div className="relative hidden lg:flex justify-center h-[400px]">
            {showcaseProducts.map((product, index) => {
              const isActive = index === currentSlide;
              const isPrev = index === (currentSlide - 1 + showcaseProducts.length) % showcaseProducts.length;
              const isNext = index === (currentSlide + 1) % showcaseProducts.length;

              let translateClass = "translate-x-full opacity-0 scale-75";
              if (isActive) translateClass = "translate-x-0 opacity-100 scale-100 z-20";
              else if (isPrev) translateClass = "-translate-x-3/4 opacity-40 scale-75 z-10 blur-[2px]";
              else if (isNext) translateClass = "translate-x-3/4 opacity-40 scale-75 z-10 blur-[2px]";

              return (
                <div 
                  key={product.id} 
                  className={`absolute top-0 w-[280px] h-[380px] transition-all duration-700 ease-in-out ${translateClass}`}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 h-full border border-white/20 shadow-2xl flex flex-col items-center justify-between group hover:bg-white/15 transition-colors cursor-pointer" onClick={() => router.push(`/product/${product.id}`)}>
                    <div className="w-full h-48 bg-white/90 rounded-2xl overflow-hidden shadow-inner mb-4 flex items-center justify-center p-4">
                      <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="text-center w-full">
                      <h3 className="font-semibold text-lg text-white mb-2 line-clamp-2">{product.title}</h3>
                      <span className="inline-block bg-white text-gray-900 px-4 py-1.5 rounded-full font-bold text-sm shadow-lg">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
