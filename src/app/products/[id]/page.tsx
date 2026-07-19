'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProduct, useRelatedProducts } from '@/hooks/useProducts';
import { useAuth } from '@/lib/auth-context';
import api from '@/lib/api';
import ProductGallery from '@/components/products/ProductGallery';
import ProductCard from '@/components/products/ProductCard';
import ReviewCard, { Review } from '@/components/reviews/ReviewCard';
import ReviewForm from '@/components/reviews/ReviewForm';
import StarRating from '@/components/reviews/StarRating';
import { FiShoppingCart } from 'react-icons/fi';
import { useQueryClient } from '@tanstack/react-query';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const { data: productData, isLoading: isLoadingProduct } = useProduct(id);
  const { data: relatedData, isLoading: isLoadingRelated } = useRelatedProducts(id);
  const { isAuthenticated } = useAuth();
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsTotal, setReviewsTotal] = useState(0);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const queryClient = useQueryClient();

  // Safely extract the product object whether it's wrapped in { success, data } or not
  const product = (productData as any)?.data || productData;
  const relatedProducts = (relatedData as any)?.data || relatedData || [];

  const fetchReviews = async () => {
    setIsLoadingReviews(true);
    try {
      // Trying to match the route used in hooks
      const response = await api.get(`/products/${id}/reviews`);
      const payload = response.data?.data || response.data;
      setReviews(payload.items || []);
      setReviewsTotal(payload.total || 0);
    } catch (error) {
      console.error('Failed to fetch reviews', error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  if (isLoadingProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <button onClick={() => router.push('/')} className="text-primary-600 hover:underline">
          Return to home
        </button>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    setIsAddingToCart(true);
    try {
      const res = await api.get('/cart');
      const cart = res.data.data;
      const productId = product._id || product.id;
      const existingItem = cart?.items?.find((item: any) => 
        (item.productId?._id || item.productId) === productId
      );
      
      let newItems = cart?.items || [];
      if (existingItem) {
        newItems = newItems.map((item: any) => 
          (item.productId?._id || item.productId) === productId 
            ? { ...item, qty: item.qty + 1 } 
            : item
        );
      } else {
        newItems.push({ productId, qty: 1 });
      }
      
      const updatePayload = newItems.map((item: any) => ({
        productId: item.productId?._id || item.productId,
        qty: item.qty
      }));
      
      await api.put('/cart', { items: updatePayload });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    } catch (err) {
      console.error('Failed to add to cart', err);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    router.push('/checkout');
  };

  const hasDiscount = product.discountPrice !== undefined && product.discountPrice < product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-white">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16">
        {/* Gallery */}
        <div className="w-full lg:w-1/2">
          <ProductGallery images={product.images || []} />
        </div>

        {/* Key Info Panel */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-primary-600 font-semibold tracking-wide uppercase text-sm">
              {product.category || 'Uncategorized'}
            </span>
            {product.condition && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                {product.condition}
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {product.title || product.name}
          </h1>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <StarRating rating={product.rating?.avg || product.rating || 0} size="md" readOnly />
              <span className="text-sm font-medium text-gray-700">
                {typeof product.rating === 'object' ? product.rating.avg?.toFixed(1) : (product.rating || 0).toFixed(1)}
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">{reviewsTotal} Reviews</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">
              Sold by <span className="font-semibold text-gray-700">{product.sellerId?.name || 'Unknown'}</span>
            </span>
          </div>

          <div className="mb-6">
            {hasDiscount ? (
              <div className="flex items-end space-x-3">
                <span className="text-4xl font-black text-amber-600">${product.discountPrice?.toFixed(2)}</span>
                <span className="text-xl text-gray-400 line-through mb-1">${product.price?.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-4xl font-black text-gray-900">${product.price?.toFixed(2)}</span>
            )}
          </div>

          {product.brand && (
            <div className="mb-6 flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Brand:</span>
              <span className="font-semibold text-gray-900">{product.brand}</span>
            </div>
          )}

          <div className="mb-8">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0 || isAddingToCart}
              className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
              {isAddingToCart ? (
                <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <FiShoppingCart className="w-6 h-6" />
              )}
              <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
            </button>

            {isAuthenticated && (
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0 || isAddingToCart}
                className="flex-1 flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
              >
                <span>Buy Now</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="border-t border-gray-100 pt-12 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
        <div className="prose max-w-none text-gray-600 leading-relaxed">
          {product.description || 'No description available for this product.'}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-gray-100 pt-12 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews ({reviewsTotal})</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Review List */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            {isLoadingReviews ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review: any, index: number) => <ReviewCard key={review._id || review.id || `review-${index}`} review={review} />)
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-500">
                No reviews yet. Be the first to review this product!
              </div>
            )}
          </div>
          
          {/* Review Form */}
          <div className="lg:col-span-1">
            {isAuthenticated ? (
              <ReviewForm productId={id} onSuccess={fetchReviews} />
            ) : (
              <div className="bg-gray-50 p-6 rounded-2xl text-center flex flex-col items-center justify-center border border-gray-100 h-full min-h-[250px]">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Want to write a review?</h3>
                <p className="text-gray-500 mb-4">You need to be logged in to leave a review.</p>
                <button
                  onClick={() => router.push('/login')}
                  className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-6 rounded-xl transition-all shadow-sm"
                >
                  Log In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-100 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((relatedProduct: any, index: number) => (
              <ProductCard key={relatedProduct._id || relatedProduct.id || `related-${index}`} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
