'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { Suspense } from 'react';

function CheckoutSuccessContent() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    const confirmOrder = async () => {
      const sessionId = searchParams?.get('session_id');
      
      if (!sessionId) {
        setStatus('error');
        setErrorMessage('No session ID found in the URL.');
        return;
      }

      try {
        await api.post('/orders/confirm', { session_id: sessionId });
        
        // Invalidate cart and orders so they refresh
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        
        setStatus('success');
        
        // Auto redirect after a few seconds
        setTimeout(() => {
          router.push('/orders');
        }, 4000);
      } catch (error: any) {
        console.error('Confirmation error:', error);
        setStatus('error');
        setErrorMessage(error.response?.data?.message || 'Failed to confirm payment.');
      }
    };

    if (isAuthenticated) {
      confirmOrder();
    }
  }, [isAuthenticated, searchParams, queryClient, router]);

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      {status === 'loading' && (
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirming Payment...</h1>
          <p className="text-gray-500">Please wait while we verify your transaction with Stripe.</p>
        </div>
      )}

      {status === 'success' && (
        <div className="text-center bg-white p-8 sm:p-12 rounded-3xl shadow-xl max-w-lg w-full transform transition-all">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-8 animate-bounce" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Thank you for your purchase. Your order has been placed and is now processing.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            You will be redirected to your orders page shortly...
          </p>
          <Link
            href="/orders"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
          >
            View My Orders
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div className="text-center bg-white p-8 sm:p-12 rounded-3xl shadow-xl max-w-lg w-full">
          <XCircle className="w-24 h-24 text-red-500 mx-auto mb-8" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Verification Failed</h1>
          <p className="text-lg text-gray-600 mb-8">
            {errorMessage}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/cart"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
