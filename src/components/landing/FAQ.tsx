'use client';

import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
  {
    question: "How do I start selling on ZenCart?",
    answer: "Getting started is easy! Click on 'Sell a Product' or 'Become a Seller' in the navigation menu. Create your seller profile, set up your payment details to receive funds, and you can start listing your products immediately."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are securely processed and encrypted."
  },
  {
    question: "How does shipping work?",
    answer: "Shipping is handled directly by our sellers. When you view a product, you'll see the estimated shipping time and cost set by that specific seller. You'll receive tracking information once your order ships."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day Buyer Protection guarantee. If your item doesn't arrive, arrives damaged, or isn't as described, you can open a dispute to receive a full refund."
  },
  {
    question: "Are the products authentic?",
    answer: "Yes, we have a strict zero-tolerance policy for counterfeits. We vet our sellers and provide authenticity guarantees for premium items in categories like designer fashion and electronics."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="mt-4 text-gray-600 text-lg">
            Everything you need to know about buying and selling on ZenCart.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-gray-50 shadow-md border-primary-100' : 'bg-white hover:border-gray-300'}`}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between focus:outline-none"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold text-left text-lg ${isOpen ? 'text-primary-700' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'bg-primary-100 text-primary-600 rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                    <FiChevronDown className="w-5 h-5" />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
