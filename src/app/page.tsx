import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import CategoryTiles from '@/components/landing/CategoryTiles';
import FeaturedProducts from '@/components/landing/FeaturedProducts';
import DealsSection from '@/components/landing/DealsSection';
import HowItWorks from '@/components/landing/HowItWorks';
import StatsSection from '@/components/landing/StatsSection';
import Testimonials from '@/components/landing/Testimonials';
import TrustSection from '@/components/landing/TrustSection';
import Newsletter from '@/components/landing/Newsletter';
import FAQ from '@/components/landing/FAQ';

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <HeroSection />
      <CategoryTiles />
      <FeaturedProducts />
      <DealsSection />
      <HowItWorks />
      <StatsSection />
      <Testimonials />
      <TrustSection />
      <FAQ />
      <Newsletter />
    </div>
  );
}
