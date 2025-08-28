import { v4 as uuid } from 'uuid';
/** In-memory datastore for development */
export class InMemoryStore {
    users = new Map();
    restaurants = new Map();
    orders = new Map();
    subscriptions = new Map();
    plans = new Map();
    generateId() { return uuid(); }
}
export const db = new InMemoryStore();
// Seed subscription plans
(() => {
    const plans = [
        { id: 'plan_basic', tier: 'basic', title: 'Básico', priceMonthly: 1990, benefits: ['1 caixa surpresa/mês', 'Descontos leves'] },
        { id: 'plan_plus', tier: 'plus', title: 'Plus', priceMonthly: 3990, benefits: ['2 caixas surpresa/mês', 'Descontos médios', 'Badge Plus'] },
        { id: 'plan_premium', tier: 'premium', title: 'Premium', priceMonthly: 6990, benefits: ['4 caixas surpresa/mês', 'Descontos altos', 'Badge Premium'] },
    ];
    for (const p of plans)
        db.plans.set(p.id, p);
})();
