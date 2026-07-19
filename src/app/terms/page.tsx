import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | ZenCart',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-8 md:p-14 rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50">
        <div className="border-b border-slate-200 dark:border-slate-700 pb-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">Terms of Service</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Last updated: July 18, 2026</p>
        </div>
        
        <div className="prose prose-indigo dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3 text-sm">1</span>
              Agreement to Terms
            </h2>
            <p className="leading-relaxed">
              By viewing or using this website, which can be accessed at zencart.com, you are agreeing to be bound by these website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3 text-sm">2</span>
              Use License
            </h2>
            <p className="leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials on ZenCart's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-none space-y-3 pl-0">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">â€¢</span>
                <span>modify or copy the materials;</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">â€¢</span>
                <span>use the materials for any commercial purpose or for any public display;</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">â€¢</span>
                <span>attempt to reverse engineer any software contained on ZenCart's Website;</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">â€¢</span>
                <span>remove any copyright or other proprietary notations from the materials; or</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">â€¢</span>
                <span>transfer the materials to another person or "mirror" the materials on any other server.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3 text-sm">3</span>
              Disclaimer
            </h2>
            <p className="leading-relaxed">
              All the materials on ZenCart's Website are provided "as is". ZenCart makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, ZenCart does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3 text-sm">4</span>
              Limitations
            </h2>
            <p className="leading-relaxed">
              ZenCart or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on ZenCart's Website, even if ZenCart or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
