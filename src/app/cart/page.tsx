'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { Cart } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login?from=/cart');
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCart = async (newItems: { productId: string; qty: number }[]) => {
    try {
      const res = await api.put('/cart', { items: newItems });
      setCart(res.data.data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const handleUpdateQty = (productId: string, newQty: number) => {
    if (!cart) return;
    const items = cart.items.map(item => {
      const pId = typeof item.productId === 'string' ? item.productId : item.productId._id;
      return pId === productId ? { ...item, qty: newQty } : item;
    }).filter(item => item.qty > 0);
    
    // For updating via API, we just need the array of { productId, qty }
    updateCart(items.map(i => ({ 
      productId: typeof i.productId === 'string' ? i.productId : (i.productId as { _id: string })._id, 
      qty: i.qty 
    })));
    
    // Optimistic update
    setCart({
      ...cart,
      items: cart.items.map(item => {
        const pId = typeof item.productId === 'string' ? item.productId : item.productId._id;
        return pId === productId ? { ...item, qty: newQty } : item;
      }).filter(item => item.qty > 0)
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  if (!user) return null;

  const subtotal = cart?.items.reduce((acc, item) => {
    const price = typeof item.productId === 'object' ? item.productId.price || 0 : item.product?.price || 0;
    return acc + (price * item.qty);
  }, 0) || 0;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      {!cart || cart.items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/shop" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-8">
            <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {cart.items.map((item) => {
                const p = typeof item.productId === 'object' ? item.productId : item.product;
                const pid = typeof item.productId === 'string' ? item.productId : item.productId._id;
                const images = p?.images || [];
                const title = p?.title || 'Product';
                const price = p?.price || 0;

                return (
                  <li key={pid} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={images[0] || 'https://via.placeholder.com/150'}
                        alt={title}
                        className="w-24 h-24 rounded-md object-cover object-center sm:w-32 sm:h-32"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link href={`/products/${pid}`} className="font-medium text-gray-700 hover:text-gray-800">
                                {title}
                              </Link>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">${price.toFixed(2)}</p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <div className="flex items-center border border-gray-300 rounded-md w-max">
                            <button
                              onClick={() => handleUpdateQty(pid, item.qty - 1)}
                              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-gray-900 font-medium">{item.qty}</span>
                            <button
                              onClick={() => handleUpdateQty(pid, item.qty + 1)}
                              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="absolute top-0 right-0">
                            <button
                              type="button"
                              onClick={() => handleUpdateQty(pid, 0)}
                              className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500 transition-colors"
                            >
                              <span className="sr-only">Remove</span>
                              <Trash2 className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                        <span>Total: ${( price * item.qty ).toFixed(2)}</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-16 bg-gray-50 rounded-2xl px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-4">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            
            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </dd>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link href="/checkout" className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 text-center block transition-colors">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
