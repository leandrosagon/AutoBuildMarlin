const stripeSecret = process.env.STRIPE_SECRET_KEY;
/**
 * Returns a minimal API to create PaymentIntents.
 * If STRIPE_SECRET_KEY is missing, returns a stub implementation.
 */
export function getStripeClient() {
    if (!stripeSecret) {
        return {
            async createPaymentIntent(amount, currency = 'usd') {
                return { id: `pi_stub_${Date.now()}`, client_secret: `cs_stub_${Date.now()}`, amount, currency, status: 'requires_payment_method' };
            }
        };
    }
    // Lazy import to avoid requiring stripe package if not configured
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Stripe = require('stripe');
    const stripe = new Stripe(stripeSecret, { apiVersion: '2023-10-16' });
    return {
        async createPaymentIntent(amount, currency = 'usd') {
            const pi = await stripe.paymentIntents.create({ amount, currency, automatic_payment_methods: { enabled: true } });
            return { id: pi.id, client_secret: pi.client_secret, amount: pi.amount, currency: pi.currency, status: pi.status };
        }
    };
}
