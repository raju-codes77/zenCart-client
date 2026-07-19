import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { Cart } from '../types';

export const useCart = (isAuthenticated: boolean) => {
  return useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await api.get('/cart');
      return data.data;
    },
    enabled: isAuthenticated,
  });
};
