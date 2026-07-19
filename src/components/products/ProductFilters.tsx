import React from 'react';

export interface FilterValues {
  category: string;
  priceMin: string;
  priceMax: string;
  sort: string;
}

interface ProductFiltersProps {
  filters: FilterValues;
  onChange: (key: keyof FilterValues, value: string) => void;
  onClear: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, onChange, onClear }) => {
  const categories = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Jewelery', value: 'jewelery' },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" },
    { label: 'Home', value: 'home' },
    { label: 'Sports', value: 'sports' }
  ];

  return (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Filters</h2>
        <button onClick={onClear} className="text-sm text-blue-600 hover:underline">
          Clear All
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <label className="font-semibold text-sm text-gray-700">Category</label>
        <select
          value={filters.category}
          onChange={(e) => onChange('category', e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <label className="font-semibold text-sm text-gray-700">Price Range</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => onChange('priceMin', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => onChange('priceMax', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="font-semibold text-sm text-gray-700">Sort By</label>
        <select
          value={filters.sort}
          onChange={(e) => onChange('sort', e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
        >
          <option value="">Recommended</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest Arrivals</option>
          <option value="rating_desc">Customer Rating</option>
        </select>
      </div>
    </div>
  );
};
