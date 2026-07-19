'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useMyProducts } from '@/hooks/useProducts';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiTrash2, FiEye, FiPlus } from 'react-icons/fi';
import api from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';

export default function ManageItemsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const { data: products, isLoading: productsLoading } = useMyProducts();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/login?from=/items/manage');
      } else if (user?.role !== 'admin') {
        alert("This page is for store admins only.");
        router.push("/");
      }
    }
  }, [isAuthenticated, authLoading, user, router]);

  if (authLoading || !isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Handle data structure if backend wraps in data.data
  const productList = Array.isArray(products) ? products : (products as any)?.data || [];

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setIsDeleting(true);
      await api.delete(`/products/${deleteId}`);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setDeleteId(null);
    } catch (err) {
      console.error('Failed to delete product', err);
      alert('Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Manage Items</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View and manage your product listings.</p>
        </div>
        <Link 
          href="/items/add" 
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <FiPlus className="h-5 w-5" />
          Add New Item
        </Link>
      </div>

      {productsLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : productList.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-gray-200/50 bg-white/50 p-8 text-center backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-900/50 shadow-sm">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiPlus className="h-12 w-12" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">No items found</h3>
          <p className="mb-8 max-w-sm text-gray-500 dark:text-gray-400">You haven't listed any products yet. Start selling by adding your first item.</p>
          <Link
            href="/items/add"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/40"
          >
            <FiPlus className="h-5 w-5" />
            Add Your First Item
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white/60 shadow-sm backdrop-blur-xl dark:border-gray-800/60 dark:bg-gray-900/60">
          {/* Mobile view */}
          <div className="block md:hidden divide-y divide-gray-200/50 dark:divide-gray-800/50">
            {productList.map((product: any) => (
              <div key={product._id} className="p-4 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                <div className="flex gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400"><FiEye /></div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 line-clamp-1 dark:text-white">{product.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{product.category}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">${product.price?.toFixed(2)}</span>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Stock: {product.stock}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={`/products/${product._id}`} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                    <FiEye /> View
                  </Link>
                  <button onClick={() => setDeleteId(product._id)} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40">
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
              <thead className="bg-gray-50/50 text-xs uppercase text-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium">Product</th>
                  <th scope="col" className="px-6 py-4 font-medium">Category</th>
                  <th scope="col" className="px-6 py-4 font-medium">Price</th>
                  <th scope="col" className="px-6 py-4 font-medium">Stock</th>
                  <th scope="col" className="px-6 py-4 font-medium">Status</th>
                  <th scope="col" className="px-6 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-gray-800/50">
                {productList.map((product: any) => (
                  <tr key={product._id} className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-gray-400"><FiEye /></div>
                          )}
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-white max-w-[200px] truncate" title={product.name}>
                          {product.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize">{product.category}</td>
                    <td className="px-6 py-4 font-medium text-primary">${product.price?.toFixed(2)}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/products/${product._id}`}
                          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                          title="View"
                        >
                          <FiEye className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(product._id)}
                          className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                          title="Delete"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 dark:border dark:border-gray-800">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 mx-auto">
              <FiTrash2 className="h-7 w-7" />
            </div>
            <h3 className="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white">Delete Product</h3>
            <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 rounded-xl bg-red-600 py-2.5 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isDeleting ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                ) : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
