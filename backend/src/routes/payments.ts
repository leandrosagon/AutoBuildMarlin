import { Router } from 'express';
import { getStripeClient } from '../services/stripe.js';

export const paymentsRouter = Router();

paymentsRouter.post('/intent', async (req, res, next) => {
  try {
    const { amount, currency } = req.body || {};
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }
    const stripe = getStripeClient();
    const intent = await stripe.createPaymentIntent(amount, currency ?? 'usd');
    res.json({ success: true, message: 'PaymentIntent created', data: intent });
  } catch (e) {
    next(e);
  }
});

