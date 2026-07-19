'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product, Cart } from '@/types';
import { useAuth } from '@/lib/auth-context';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import api from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';

interface ProductCardProps {
  product: Product | any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = React.useState(false);
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    setIsAdding(true);
    try {
      const res = await api.get('/cart');
      const cart: Cart = res.data.data;
      const productId = product._id || product.id;
      const existingItem = cart?.items?.find(item => {
        const pId = typeof item.productId === 'string' ? item.productId : item.productId._id;
        return pId === productId;
      });
      
      let newItems = cart?.items ? [...cart.items] : [];
      if (existingItem) {
        newItems = newItems.map(item => {
          const pId = typeof item.productId === 'string' ? item.productId : item.productId._id;
          return pId === productId ? { ...item, qty: item.qty + 1 } : item;
        });
      } else {
        newItems.push({ productId, qty: 1 });
      }
      
      const updatePayload = newItems.map(item => ({
        productId: typeof item.productId === 'string' ? item.productId : item.productId._id,
        qty: item.qty
      }));
      
      await api.put('/cart', { items: updatePayload });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    } catch (err) {
      console.error('Failed to add to cart', err);
    } finally {
      setIsAdding(false);
    }
  };

  // Handle both types of product payload (from hooks or from types)
  const title = product.title || product.name || 'Untitled Product';
  const price = product.price || 0;
  const discountPrice = product.discountPrice;
  const hasDiscount = discountPrice !== undefined && discountPrice < price;
  const category = product.category || 'Uncategorized';
  const images = product.images || [];

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 p-4 w-full h-full">
      <Link href={`/products/${product._id || product.id}`} className="flex flex-col h-full">
        {/* Category Badge & Status */}
        <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-gray-700 shadow-sm border border-gray-200/50 uppercase">
            {category}
          </span>
          {hasDiscount && (
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Image Container */}
        <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gray-50 mb-4 flex-shrink-0 flex items-center justify-center p-4">
          <img 
            src={images.length > 0 ? images[0] : 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image'} 
            alt={title}
            className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          {/* Rating */}
          {product.rating ? (
            <div className="flex items-center space-x-1 mb-2">
              <FiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-gray-700">{product.rating.avg?.toFixed(1) || 0}</span>
              <span className="text-xs text-gray-400">({product.rating.count || 0})</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 mb-2">
              <FiStar className="w-4 h-4 text-gray-300" />
              <span className="text-sm font-semibold text-gray-400">0.0</span>
            </div>
          )}
          
          <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex flex-col">
              {hasDiscount ? (
                <>
                  <span className="text-xl font-bold text-amber-600">${discountPrice?.toFixed(2)}</span>
                  <span className="text-sm text-gray-400 line-through">${price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-900">${price.toFixed(2)}</span>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`p-3 rounded-full transition-all duration-300 shadow-sm transform active:scale-95 z-20 ${
                isAdding 
                  ? 'bg-primary-100 text-primary-400 cursor-wait' 
                  : 'bg-gray-100 hover:bg-primary-600 text-gray-700 hover:text-white hover:shadow-md'
              }`}
              aria-label="Add to cart"
            >
              {isAdding ? (
                <div className="w-5 h-5 rounded-full border-2 border-primary-400 border-t-transparent animate-spin" />
              ) : (
                <FiShoppingCart className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
