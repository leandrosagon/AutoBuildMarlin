export type ID = string;

export interface User {
  id: ID;
  email: string;
  name: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Restaurant {
  id: ID;
  name: string;
  description?: string;
  categories: string[];
  rating: number;
  deliveryFee: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  restaurantId: ID;
  name: string;
  quantity: number;
  price: number; // unit price
}

export type OrderStatus = 'pending' | 'paid' | 'preparing' | 'delivering' | 'completed' | 'cancelled';

export interface Order {
  id: ID;
  userId: ID;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentIntentId?: string; // Stripe
  createdAt: string;
  updatedAt: string;
}

export type PlanTier = 'basic' | 'plus' | 'premium';

export interface SubscriptionPlan {
  id: ID;
  tier: PlanTier;
  title: string;
  priceMonthly: number; // cents
  benefits: string[];
}

export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'incomplete' | 'trialing';

export interface Subscription {
  id: ID;
  userId: ID;
  planId: ID;
  status: SubscriptionStatus;
  currentPeriodEnd: string; // ISO date
  stripeSubscriptionId?: string;
  createdAt: string;
  updatedAt: string;
}

