import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  sellerId: string;
  rating: number;
  numReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
}

interface ProductQueryParams {
  search?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export const useProducts = (params: ProductQueryParams = {}) => {
  return useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: async () => {
      const { data } = await api.get('/products', { params });
      return data.data;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useRelatedProducts = (id: string) => {
  return useQuery<Product[]>({
    queryKey: ['product', id, 'related'],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}/related`);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useMyProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products', 'mine'],
    queryFn: async () => {
      const { data } = await api.get('/products/mine');
      return data.data;
    },
  });
};
