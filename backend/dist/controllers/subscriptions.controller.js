import { z } from 'zod';
import { db } from '../services/datastore.js';
import { ok, created, error } from '../utils/response.js';
const createSchema = z.object({
    userId: z.string().min(1),
    planId: z.string().min(1)
});
export function listPlans(_req, res) {
    const data = Array.from(db.plans.values());
    return ok(res, 'Plans fetched', data, { total: data.length });
}
export function listSubscriptions(_req, res) {
    const data = Array.from(db.subscriptions.values());
    return ok(res, 'Subscriptions fetched', data, { total: data.length });
}
export function createSubscription(req, res) {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success)
        return error(res, 400, 'Invalid payload', parsed.error.flatten());
    const plan = db.plans.get(parsed.data.planId);
    if (!plan)
        return error(res, 404, 'Plan not found');
    const now = new Date();
    const periodEnd = new Date(now.getTime());
    periodEnd.setMonth(now.getMonth() + 1);
    const sub = {
        id: db.generateId(),
        userId: parsed.data.userId,
        planId: plan.id,
        status: 'active',
        currentPeriodEnd: periodEnd.toISOString(),
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
    };
    db.subscriptions.set(sub.id, sub);
    return created(res, 'Subscription created', sub);
}
export function getSubscription(req, res) {
    const s = db.subscriptions.get(req.params.id);
    if (!s)
        return error(res, 404, 'Subscription not found');
    return ok(res, 'Subscription fetched', s);
}
export function cancelSubscription(req, res) {
    const s = db.subscriptions.get(req.params.id);
    if (!s)
        return error(res, 404, 'Subscription not found');
    s.status = 'canceled';
    s.updatedAt = new Date().toISOString();
    db.subscriptions.set(s.id, s);
    return ok(res, 'Subscription canceled', s);
}
