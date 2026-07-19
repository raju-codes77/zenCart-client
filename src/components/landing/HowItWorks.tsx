'use client';

import React, { useState } from 'react';
import { FiSearch, FiCreditCard, FiPackage, FiEdit, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');

  const buyerSteps = [
    { icon: FiSearch, title: 'Discover', desc: 'Browse thousands of unique products from verified sellers worldwide.' },
    { icon: FiCreditCard, title: 'Purchase', desc: 'Checkout securely using our encrypted payment gateway.' },
    { icon: FiPackage, title: 'Receive', desc: 'Get real-time tracking updates until the product reaches your door.' }
  ];

  const sellerSteps = [
    { icon: FiEdit, title: 'List Items', desc: 'Create your seller profile and upload your products in minutes.' },
    { icon: FiDollarSign, title: 'Make Sales', desc: 'Reach millions of active buyers looking for your exact items.' },
    { icon: FiTrendingUp, title: 'Grow Business', desc: 'Use our analytics tools to optimize your listings and increase revenue.' }
  ];

  const activeSteps = activeTab === 'buyer' ? buyerSteps : sellerSteps;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">How It Works</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Whether you're looking to buy unique items or start your own store, we make it simple.
          </p>
        </div>

        {/* Custom Toggle Switch */}
        <div className="flex justify-center mb-16">
          <div className="bg-gray-100 p-1 rounded-full inline-flex relative shadow-inner">
            <button
              onClick={() => setActiveTab('buyer')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === 'buyer' ? 'text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              For Buyers
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === 'seller' ? 'text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              For Sellers
            </button>
            {/* Sliding background indicator */}
            <div 
              className={`absolute top-1 bottom-1 w-1/2 bg-primary-600 rounded-full shadow-md transition-transform duration-300 ease-out z-0`}
              style={{ transform: activeTab === 'buyer' ? 'translateX(0)' : 'translateX(100%)' }}
            ></div>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 relative z-10">
            {activeSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-white rounded-full border-4 border-gray-50 shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary-100 transition-all duration-300 relative">
                    <div className="absolute inset-0 bg-primary-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out z-0"></div>
                    <Icon className="w-8 h-8 text-primary-600 relative z-10" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md z-20">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
