import React from 'react';
import { Shield, Truck, RefreshCw, Clock } from 'lucide-react';

export default function TrustSection() {
  const features = [
    {
      name: 'Secure Payments',
      description: 'Your payment information is processed securely with industry-standard encryption.',
      icon: <Shield className="w-8 h-8 text-indigo-600" />
    },
    {
      name: 'Fast Shipping',
      description: 'Get your orders delivered quickly with our premium shipping partners.',
      icon: <Truck className="w-8 h-8 text-indigo-600" />
    },
    {
      name: 'Easy Returns',
      description: 'Not satisfied? Return your items within 30 days for a full refund.',
      icon: <RefreshCw className="w-8 h-8 text-indigo-600" />
    },
    {
      name: '24/7 Support',
      description: 'Our customer support team is always here to help you with any issues.',
      icon: <Clock className="w-8 h-8 text-indigo-600" />
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Why Shop With Us
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We provide a premium shopping experience from start to finish, ensuring you get exactly what you want, when you want it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 border border-slate-100 group">
              <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.name}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
