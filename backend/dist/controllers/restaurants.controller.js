import { z } from 'zod';
import { db } from '../services/datastore.js';
import { ok, created, error } from '../utils/response.js';
const restaurantSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    categories: z.array(z.string()).default([]),
    rating: z.number().min(0).max(5).default(4),
    deliveryFee: z.number().min(0).default(0)
});
export function listRestaurants(_req, res) {
    const data = Array.from(db.restaurants.values());
    return ok(res, 'Restaurants fetched', data, { total: data.length });
}
export function getRestaurant(req, res) {
    const r = db.restaurants.get(req.params.id);
    if (!r)
        return error(res, 404, 'Restaurant not found');
    return ok(res, 'Restaurant fetched', r);
}
export function createRestaurant(req, res) {
    const parsed = restaurantSchema.safeParse(req.body);
    if (!parsed.success)
        return error(res, 400, 'Invalid payload', parsed.error.flatten());
    const now = new Date().toISOString();
    const id = db.generateId();
    const rest = { id, createdAt: now, updatedAt: now, ...parsed.data };
    db.restaurants.set(id, rest);
    return created(res, 'Restaurant created', rest);
}
export function updateRestaurant(req, res) {
    const existing = db.restaurants.get(req.params.id);
    if (!existing)
        return error(res, 404, 'Restaurant not found');
    const parsed = restaurantSchema.partial().safeParse(req.body);
    if (!parsed.success)
        return error(res, 400, 'Invalid payload', parsed.error.flatten());
    const updated = { ...existing, ...parsed.data, updatedAt: new Date().toISOString() };
    db.restaurants.set(existing.id, updated);
    return ok(res, 'Restaurant updated', updated);
}
export function deleteRestaurant(req, res) {
    const okDelete = db.restaurants.delete(req.params.id);
    if (!okDelete)
        return error(res, 404, 'Restaurant not found');
    return ok(res, 'Restaurant deleted');
}
