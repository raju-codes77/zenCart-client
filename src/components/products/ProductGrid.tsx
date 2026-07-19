import React from 'react';
import ProductCard from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import { Product } from '../../hooks/useProducts';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  skeletonCount?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  skeletonCount = 8,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))
        : products.map((product, index) => (
            <ProductCard key={product.id || `grid-${index}`} product={product} />
          ))}
    </div>
  );
};
