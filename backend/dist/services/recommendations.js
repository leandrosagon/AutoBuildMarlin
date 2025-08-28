import { db } from './datastore.js';
/**
 * Simple heuristic recommender: boost categories from user's past orders
 */
export function getRecommendationsForUser(userId, limit = 5) {
    const orders = Array.from(db.orders.values()).filter(o => o.userId === userId);
    const categoryScore = {};
    for (const o of orders) {
        for (const it of o.items) {
            const rest = db.restaurants.get(it.restaurantId);
            if (!rest)
                continue;
            for (const cat of rest.categories) {
                categoryScore[cat] = (categoryScore[cat] ?? 0) + it.quantity;
            }
        }
    }
    const all = Array.from(db.restaurants.values());
    const scored = all.map(r => {
        const base = r.rating;
        const catBoost = r.categories.reduce((acc, c) => acc + (categoryScore[c] ?? 0), 0);
        return { r, score: base + catBoost * 0.1 };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, limit).map(s => s.r);
}
