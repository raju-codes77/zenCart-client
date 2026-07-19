'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '@/types';
import ProductCard from '../products/ProductCard';
import { FiLoader } from 'react-icons/fi';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products?sort=rating_desc&limit=8`
        );
        // Assuming paginated response or direct array
        const data = response.data.data?.items || response.data.data || [];
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch featured products', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Featured Products</h2>
            <p className="mt-3 text-gray-600 max-w-2xl text-lg">
              Top-rated items handpicked for you.
            </p>
          </div>
          <a href="/shop" className="hidden md:inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            View All <span className="ml-2">→</span>
          </a>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <FiLoader className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id || `featured-${index}`} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 bg-white rounded-2xl border border-gray-100">
            No featured products found.
          </div>
        )}
        
        <div className="mt-10 text-center md:hidden">
          <a href="/shop" className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            View All Products <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
