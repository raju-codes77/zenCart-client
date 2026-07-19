'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-[#4F46E5] dark:text-indigo-400 mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We'd love to hear from you. Drop us a line and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 p-6 rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/50">
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Contact Information</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">Reach out to us through any of these channels.</p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">support@zencart.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">123 Commerce St, NY</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 p-8 rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/50">
              {submitted ? (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-600 dark:text-slate-400">Thank you for contacting us. We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</label>
                      <input type="text" id="name" required className="w-full px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-white" placeholder="John" />
                    </div>
                    <div>
                      <label htmlFor="lastname" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
                      <input type="text" id="lastname" required className="w-full px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-white" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                    <input type="email" id="email" required className="w-full px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-white" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                    <textarea id="message" rows={5} required className="w-full px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-white resize-none" placeholder="How can we help you?"></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 px-6 rounded-xl text-white font-bold text-lg bg-[#4F46E5] hover:bg-[#4338ca] transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
