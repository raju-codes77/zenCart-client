'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { Order } from '@/types';
import { Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login?from=/orders');
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/mine');
      const data = res.data.data;
      setOrders(Array.isArray(data) ? data : data.items || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  if (!user) return null;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'shipped': return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No orders found</h2>
          <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
          <Link href="/shop" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order._id || order.id} className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-8">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Order Number</p>
                    <p className="text-sm font-semibold text-gray-900 font-mono">#{(order._id || order.id).slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Date Placed</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Amount</p>
                    <p className="text-sm font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusStyle(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="text-sm font-semibold capitalize">{order.status}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Items in this order</h4>
                <ul className="divide-y divide-gray-100">
                  {order.items.map((item: any, idx: number) => (
                    <li key={`${order._id || order.id}-item-${idx}`} className="py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</p>
                          <p className="text-sm text-gray-500">Qty: {item.qty} &times; ${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${(item.qty * item.price).toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping to</h4>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress?.fullName}<br/>
                    {order.shippingAddress?.address}<br/>
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}<br/>
                    {order.shippingAddress?.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
