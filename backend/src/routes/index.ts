import type { Express, Request, Response } from 'express';
import { userRouter } from './users.js';
import { restaurantRouter } from './restaurants.js';
import { orderRouter } from './orders.js';
import { subscriptionRouter } from './subscriptions.js';
import { recommendationRouter } from './recommendations.js';
import { paymentsRouter } from './payments.js';

/**
 * Registers application routes and common health endpoint.
 */
export const registerRoutes = (app: Express) => {
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'surprise-delivery-backend' });
  });

  app.use('/users', userRouter);
  app.use('/restaurants', restaurantRouter);
  app.use('/orders', orderRouter);
  app.use('/subscriptions', subscriptionRouter);
  app.use('/recommendations', recommendationRouter);
  app.use('/payments', paymentsRouter);
};

