import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ZenCart',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-8 md:p-14 rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50">
        <div className="border-b border-slate-200 dark:border-slate-700 pb-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Last updated: July 18, 2026</p>
        </div>
        
        <div className="prose prose-blue dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 text-sm">1</span>
              Introduction
            </h2>
            <p className="leading-relaxed">
              Welcome to ZenCart. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 text-sm">2</span>
              The Data We Collect About You
            </h2>
            <p className="leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-none space-y-3 pl-0">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">â€¢</span>
                <span><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">â€¢</span>
                <span><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">â€¢</span>
                <span><strong>Financial Data</strong> includes payment card details.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">â€¢</span>
                <span><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 text-sm">3</span>
              How We Use Your Personal Data
            </h2>
            <p className="leading-relaxed mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-none space-y-3 pl-0">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">â€¢</span>
                <span>Where we need to perform the contract we are about to enter into or have entered into with you.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">â€¢</span>
                <span>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">â€¢</span>
                <span>Where we need to comply with a legal obligation.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 text-sm">4</span>
              Data Security
            </h2>
            <p className="leading-relaxed">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
