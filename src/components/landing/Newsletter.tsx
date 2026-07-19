'use client';

import React, { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
          
          <div className="md:w-5/12 bg-primary-600 p-10 flex flex-col justify-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary-500 rounded-full opacity-50"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-primary-700 rounded-full opacity-50"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <FiMail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Stay in the loop</h3>
              <p className="text-primary-100 leading-relaxed">
                Subscribe to our newsletter for exclusive deals, new arrivals, and insider-only discounts.
              </p>
            </div>
          </div>
          
          <div className="md:w-7/12 p-10 flex flex-col justify-center">
            <h4 className="text-xl font-bold text-gray-900 mb-6">Subscribe for Updates</h4>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading' || status === 'success'}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <span className="animate-pulse">Subscribing...</span>
                ) : status === 'success' ? (
                  <span className="text-green-400">Successfully Subscribed!</span>
                ) : (
                  <>
                    <span>Subscribe Now</span>
                    <FiSend />
                  </>
                )}
              </button>
            </form>
            
            <p className="text-xs text-gray-400 mt-6 text-center">
              By subscribing, you agree to our Terms of Service and Privacy Policy. We respect your inbox.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
