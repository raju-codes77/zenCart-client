import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | ZenCart',
  description: 'Learn more about ZenCart, our mission, and our values.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-[#4F46E5] dark:text-indigo-400 mb-4 tracking-tight">
            About ZenCart
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light max-w-3xl mx-auto">
            Redefining your online shopping experience with premium quality, sustainable practices, and community-driven values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-[#4F46E5]">Our Mission</h2>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              At ZenCart, we believe that shopping should be seamless, enjoyable, and accessible to everyone. Our mission is to connect consumers with high-quality products while fostering a sustainable and ethical marketplace.
            </p>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              We carefully curate every item on our platform, ensuring that it meets our strict standards for durability, design, and environmental impact.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/40 dark:bg-slate-800/40 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/20 dark:border-slate-700/50">
            <div className="aspect-video bg-[#10B981] rounded-2xl flex items-center justify-center shadow-inner">
               <span className="text-white/90 font-bold text-2xl tracking-widest uppercase">Innovation</span>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Quality First', desc: 'We never compromise on the quality of our products and services.' },
              { title: 'Sustainability', desc: 'Committed to reducing our carbon footprint and promoting eco-friendly choices.' },
              { title: 'Customer Success', desc: 'Your satisfaction is our top priority. We go above and beyond to make you happy.' }
            ].map((value, idx) => (
              <div key={idx} className="backdrop-blur-md bg-white/60 dark:bg-slate-800/60 p-8 rounded-2xl shadow-xl border border-white/30 dark:border-slate-700/50 hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
