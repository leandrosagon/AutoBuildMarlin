import { Router } from 'express';
import { listPlans, listSubscriptions, createSubscription, getSubscription, cancelSubscription } from '../controllers/subscriptions.controller.js';

export const subscriptionRouter = Router();

subscriptionRouter.get('/plans', listPlans);
subscriptionRouter.get('/', listSubscriptions);
subscriptionRouter.post('/', createSubscription);
subscriptionRouter.get('/:id', getSubscription);
subscriptionRouter.post('/:id/cancel', cancelSubscription);

