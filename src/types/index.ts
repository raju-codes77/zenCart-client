export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: string;
  role: string;
  createdAt: string;
}

export type UserRef = string | {
  _id: string;
  name: string;
  avatarUrl?: string;
};

export interface Product {
  id: string;
  _id?: string;
  sellerId?: UserRef;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  rating: {
    avg: number;
    count: number;
  };
  brand?: string;
  condition: string;
  sourceApiId?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductRef = string | {
  _id: string;
  id?: string;
  title: string;
  price?: number;
  images?: string[];
};

export interface OrderItem {
  productId: ProductRef;
  title: string;
  price: number;
  qty: number;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: {
    name: string;
    avatarUrl?: string;
  };
}

export interface CartItem {
  productId: ProductRef;
  qty: number;
  product?: Product;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

export interface ChatMessage {
  id?: string;
  userId?: string;
  sessionId?: string;
  role: string;
  content: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface StatsResponse {
  productCount: number;
  sellerCount: number;
  orderCount: number;
  avgRating: number;
}
