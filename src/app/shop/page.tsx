'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useProducts } from '../../hooks/useProducts';
import { ProductGrid } from '../../components/products/ProductGrid';
import { ProductFilters, FilterValues } from '../../components/products/ProductFilters';

function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  // Current URL params
  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';
  const currentPriceMin = searchParams.get('priceMin') || '';
  const currentPriceMax = searchParams.get('priceMax') || '';
  const currentSort = searchParams.get('sort') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading, isError } = useProducts({
    search: currentSearch || undefined,
    category: currentCategory || undefined,
    priceMin: currentPriceMin ? Number(currentPriceMin) : undefined,
    priceMax: currentPriceMax ? Number(currentPriceMax) : undefined,
    sort: currentSort || undefined,
    page: currentPage,
    limit: 12,
  });

  const updateUrlParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Reset to page 1 on filter changes unless changing page
    if (key !== 'page') {
      params.set('page', '1');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    updateUrlParams(key, value);
  };

  const handleClearFilters = () => {
    router.push(pathname);
    setSearchInput('');
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== currentSearch) {
        updateUrlParams('search', searchInput);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, currentSearch, pathname, router, searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <ProductFilters
            filters={{
              category: currentCategory,
              priceMin: currentPriceMin,
              priceMax: currentPriceMax,
              sort: currentSort,
            }}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full border border-gray-300 rounded-full py-3 px-5 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {!isLoading && data && (
              <p className="text-sm text-gray-500 hidden sm:block">
                Showing {data.items.length} of {data.total || data.items.length} results
              </p>
            )}
          </div>

          {isError ? (
            <div className="p-8 text-center bg-red-50 text-red-600 rounded-2xl">
              Failed to load products. Please try again later.
            </div>
          ) : (
            <>
              <ProductGrid products={data?.items || []} isLoading={isLoading} />
              
              {!isLoading && data?.items.length === 0 && (
                <div className="py-20 text-center">
                  <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
                  <button onClick={handleClearFilters} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {!isLoading && data && data.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => updateUrlParams('page', String(currentPage - 1))}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-medium">
                    Page {currentPage} of {data.totalPages}
                  </span>
                  <button
                    disabled={currentPage >= data.totalPages}
                    onClick={() => updateUrlParams('page', String(currentPage + 1))}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
