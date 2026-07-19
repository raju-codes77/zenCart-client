'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { Cart } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { CheckCircle, ChevronLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  useEffect(() => {
    if (!user) {
      router.push('/login?from=/checkout');
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
      const cartData = res.data.data;
      if (!cartData || cartData.items.length === 0) {
        router.push('/cart');
      } else {
        setCart(cartData);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      router.push('/cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { fullName, address, city, state, zipCode, country } = formData;
      const shippingAddress = { fullName, address, city, state, zipCode, country };
      
      const response = await api.post('/orders/create-checkout-session', { shippingAddress });
      
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('Failed to retrieve checkout URL');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      setIsSubmitting(false);
      alert('Checkout failed. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] px-4">
        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
          Thank you for your purchase. We're redirecting you to your orders page...
        </p>
      </div>
    );
  }

  const subtotal = cart?.items.reduce((acc, item) => {
    const price = typeof item.productId === 'object' ? item.productId.price || 0 : item.product?.price || 0;
    return acc + (price * item.qty);
  }, 0) || 0;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/cart" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to cart
        </Link>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full name</label>
                    <div className="mt-1">
                      <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-3 border" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <div className="mt-1">
                      <input type="text" id="address" name="address" required value={formData.address} onChange={handleInputChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-3 border" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <div className="mt-1">
                      <input type="text" id="city" name="city" required value={formData.city} onChange={handleInputChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-3 border" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                    <div className="mt-1">
                      <input type="text" id="state" name="state" required value={formData.state} onChange={handleInputChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-3 border" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Postal code</label>
                    <div className="mt-1">
                      <input type="text" id="zipCode" name="zipCode" required value={formData.zipCode} onChange={handleInputChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-3 border" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <div className="mt-1">
                      <input type="text" id="country" name="country" required value={formData.country} onChange={handleInputChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-3 border" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dummy Credit Card Form Removed for Stripe Checkout */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8 flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? 'Processing...' : `Proceed to Payment ($${total.toFixed(2)})`}
              </button>
            </form>
          </div>

          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flow-root mb-6">
                <ul className="-my-4 divide-y divide-gray-200">
                  {cart?.items.map((item) => {
                    const p = typeof item.productId === 'object' ? item.productId : item.product;
                    const pid = typeof item.productId === 'string' ? item.productId : item.productId._id;
                    const images = p?.images || [];
                    const title = p?.title || 'Product';
                    const price = p?.price || 0;

                    return (
                      <li key={pid} className="flex py-4 space-x-4">
                        <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={images[0] || 'https://via.placeholder.com/150'}
                            alt={title}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-sm font-medium text-gray-900">
                              <h3 className="line-clamp-1">{title}</h3>
                              <p className="ml-4">${price.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.qty}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <dl className="space-y-4 text-sm text-gray-600 pt-6 border-t border-gray-200">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="font-medium text-gray-900">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="font-medium text-gray-900">${tax.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 text-lg font-bold text-gray-900">
                  <dt>Total</dt>
                  <dd>${total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
