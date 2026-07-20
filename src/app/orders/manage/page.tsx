'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FiPackage, FiCheck, FiX, FiRefreshCw, FiClock, FiCheckCircle } from 'react-icons/fi';
import api from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  qty: number;
}

interface Order {
  _id: string;
  userId: string;
  stripeSessionId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
  shippingAddress: any;
  items: OrderItem[];
}

export default function ManageOrdersPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/login?from=/orders/manage');
      } else if (user?.role !== 'admin') {
        alert("This page is for store admins only.");
        router.push("/");
      }
    }
  }, [isAuthenticated, authLoading, user, router]);

  const { data: orders, isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const res = await api.get('/orders/all');
      return res.data.data;
    },
    enabled: isAuthenticated && user?.role === 'admin'
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      await api.put(`/orders/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    }
  });

  if (authLoading || !isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"><FiClock className="h-3 w-3" /> Pending</span>;
      case 'processing': return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"><FiRefreshCw className="h-3 w-3" /> Processing</span>;
      case 'shipped': return <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800"><FiPackage className="h-3 w-3" /> Shipped</span>;
      case 'delivered': return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"><FiCheckCircle className="h-3 w-3" /> Delivered</span>;
      case 'cancelled': return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"><FiX className="h-3 w-3" /> Cancelled</span>;
      default: return <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Manage Orders</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View and update customer orders.</p>
        </div>
      </div>

      {ordersLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-gray-200/50 bg-white/50 p-8 text-center backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-900/50 shadow-sm">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiPackage className="h-12 w-12" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">No orders yet</h3>
          <p className="mb-8 max-w-sm text-gray-500 dark:text-gray-400">Your store hasn't received any orders yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white/60 shadow-sm backdrop-blur-xl dark:border-gray-800/60 dark:bg-gray-900/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
              <thead className="bg-gray-50/50 text-xs uppercase text-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium">Order ID</th>
                  <th scope="col" className="px-6 py-4 font-medium">Customer ID</th>
                  <th scope="col" className="px-6 py-4 font-medium">Date</th>
                  <th scope="col" className="px-6 py-4 font-medium">Items</th>
                  <th scope="col" className="px-6 py-4 font-medium">Total</th>
                  <th scope="col" className="px-6 py-4 font-medium">Status</th>
                  <th scope="col" className="px-6 py-4 text-right font-medium">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-gray-800/50">
                {orders.map((order) => (
                  <tr key={order._id} className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-semibold text-gray-900 dark:text-white">{order._id.substring(order._id.length - 8)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs truncate max-w-[100px] block" title={order.userId}>{order.userId.substring(0, 8)}...</span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {order.items.slice(0, 2).map((item, i) => (
                          <div key={i} className="text-xs truncate max-w-[150px]" title={item.title}>
                            {item.qty}x {item.title}
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <div className="text-xs text-gray-400">+{order.items.length - 2} more</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">
                      ${(order.total).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status || 'pending')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                        value={order.status || 'pending'}
                        onChange={(e) => updateStatusMutation.mutate({ id: order._id, status: e.target.value })}
                        disabled={updateStatusMutation.isPending}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
