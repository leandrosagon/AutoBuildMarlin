import { z } from 'zod';
import type { Request, Response } from 'express';
import { db } from '../services/datastore.js';
import { ok, created, error } from '../utils/response.js';

const orderItemSchema = z.object({
  restaurantId: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  price: z.number().positive()
});

const orderSchema = z.object({
  userId: z.string().min(1),
  items: z.array(orderItemSchema).min(1),
  deliveryFee: z.number().min(0).default(0)
});

function computeSubtotal(items: z.infer<typeof orderItemSchema>[]): number {
  return items.reduce((acc, it) => acc + it.price * it.quantity, 0);
}

export function listOrders(_req: Request, res: Response) {
  const data = Array.from(db.orders.values());
  return ok(res, 'Orders fetched', data, { total: data.length });
}

export function getOrder(req: Request, res: Response) {
  const o = db.orders.get(req.params.id);
  if (!o) return error(res, 404, 'Order not found');
  return ok(res, 'Order fetched', o);
}

export function createOrder(req: Request, res: Response) {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) return error(res, 400, 'Invalid payload', parsed.error.flatten());
  const now = new Date().toISOString();
  const id = db.generateId();
  const subtotal = computeSubtotal(parsed.data.items);
  const total = subtotal + parsed.data.deliveryFee;
  const order = {
    id,
    userId: parsed.data.userId,
    items: parsed.data.items,
    subtotal,
    deliveryFee: parsed.data.deliveryFee,
    total,
    status: 'pending' as const,
    createdAt: now,
    updatedAt: now
  };
  db.orders.set(id, order);
  return created(res, 'Order created', order);
}

export function updateOrder(req: Request, res: Response) {
  const existing = db.orders.get(req.params.id);
  if (!existing) return error(res, 404, 'Order not found');
  const parsed = orderSchema.partial().safeParse(req.body);
  if (!parsed.success) return error(res, 400, 'Invalid payload', parsed.error.flatten());
  const next = { ...existing, ...parsed.data };
  const subtotal = computeSubtotal(next.items);
  const total = subtotal + next.deliveryFee;
  const updated = { ...next, subtotal, total, updatedAt: new Date().toISOString() };
  db.orders.set(existing.id, updated);
  return ok(res, 'Order updated', updated);
}

export function deleteOrder(req: Request, res: Response) {
  const okDelete = db.orders.delete(req.params.id);
  if (!okDelete) return error(res, 404, 'Order not found');
  return ok(res, 'Order deleted');
}

