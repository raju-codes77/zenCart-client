'use client';

import React, { useState } from 'react';

const faqs = [
  { question: "How do I track my order?", answer: "Once your order has shipped, you will receive an email with a tracking link. You can also view tracking information in your account dashboard under 'Order History'." },
  { question: "What is your return policy?", answer: "We offer a 30-day return policy for all unused and unwashed items in their original packaging. Please visit our Returns page to initiate a return." },
  { question: "Do you ship internationally?", answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location and will be calculated at checkout." },
  { question: "Can I change or cancel my order?", answer: "Orders can only be modified or canceled within 1 hour of placement. After that, our fulfillment team begins processing and we cannot guarantee changes." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, MasterCard, Amex), PayPal, Apple Pay, and Google Pay." },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 bg-[url('/grid.svg')] bg-center">
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute inset-0 bg-[#10B981]/5 -z-10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-[#10B981] mb-4 tracking-tight">
            Help Center
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-light">
            Find answers to our most frequently asked questions below.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`backdrop-blur-xl rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index ? 'bg-white/80 dark:bg-slate-800/80 border-teal-500/50 shadow-lg shadow-teal-500/10' : 'bg-white/40 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-white/60 dark:hover:bg-slate-800/60'}`}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`font-semibold text-lg transition-colors ${openIndex === index ? 'text-teal-600 dark:text-teal-400' : 'text-slate-900 dark:text-slate-100 group-hover:text-teal-500'}`}>
                  {faq.question}
                </span>
                <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-teal-500' : 'text-slate-400'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center backdrop-blur-xl bg-[#10B981]/10 p-10 rounded-3xl border border-teal-500/20 shadow-xl">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Still need help?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Our support team is available 24/7 to assist you with any inquiries.</p>
          <a href="/contact" className="inline-block px-10 py-4 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-bold transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-teal-500/40">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
