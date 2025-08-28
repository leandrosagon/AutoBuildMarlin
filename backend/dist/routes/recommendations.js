import { Router } from 'express';
import { getRecommendationsForUser } from '../services/recommendations.js';
export const recommendationRouter = Router();
recommendationRouter.get('/', (req, res) => {
    const userId = req.query.userId || '';
    const limit = Number(req.query.limit ?? 5);
    const data = getRecommendationsForUser(userId, isNaN(limit) ? 5 : limit);
    res.json({ success: true, message: 'Recommendations fetched', data });
});
