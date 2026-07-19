'use client';

import React from 'react';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    content: "The quality of the products I've purchased here is unmatched. Fast shipping and the customer service is incredible.",
    author: "Sarah Jenkins",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    rating: 5
  },
  {
    id: 2,
    content: "As a seller, this platform has transformed my business. The tools provided make managing inventory a breeze.",
    author: "Michael Chen",
    role: "Top Rated Seller",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    rating: 5
  },
  {
    id: 3,
    content: "I found exactly what I was looking for in minutes. The search filters are very intuitive and the checkout was seamless.",
    author: "Emma Rodriguez",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    rating: 4
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Trusted by Thousands</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Hear from our community of buyers and sellers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full relative">
              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-8 text-8xl font-serif text-gray-100 leading-none select-none z-0">
                "
              </div>
              
              <div className="flex mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={`w-5 h-5 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                ))}
              </div>
              
              <p className="text-gray-700 italic flex-grow mb-8 relative z-10 text-lg leading-relaxed">
                "{t.content}"
              </p>
              
              <div className="flex items-center mt-auto relative z-10">
                <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-primary-100" />
                <div>
                  <h4 className="font-bold text-gray-900">{t.author}</h4>
                  <span className="text-sm text-primary-600 font-medium">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
