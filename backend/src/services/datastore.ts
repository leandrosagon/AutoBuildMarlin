import { v4 as uuid } from 'uuid';
import type { User, Restaurant, Order, Subscription, SubscriptionPlan, ID } from '../models/types';

/** In-memory datastore for development */
export class InMemoryStore {
  users: Map<ID, User> = new Map();
  restaurants: Map<ID, Restaurant> = new Map();
  orders: Map<ID, Order> = new Map();
  subscriptions: Map<ID, Subscription> = new Map();
  plans: Map<ID, SubscriptionPlan> = new Map();

  generateId(): ID { return uuid(); }
}

export const db = new InMemoryStore();

// Seed subscription plans
(() => {
  const plans: SubscriptionPlan[] = [
    { id: 'plan_basic', tier: 'basic', title: 'Básico', priceMonthly: 1990, benefits: ['1 caixa surpresa/mês', 'Descontos leves'] },
    { id: 'plan_plus', tier: 'plus', title: 'Plus', priceMonthly: 3990, benefits: ['2 caixas surpresa/mês', 'Descontos médios', 'Badge Plus'] },
    { id: 'plan_premium', tier: 'premium', title: 'Premium', priceMonthly: 6990, benefits: ['4 caixas surpresa/mês', 'Descontos altos', 'Badge Premium'] },
  ];
  for (const p of plans) db.plans.set(p.id, p);
})();

