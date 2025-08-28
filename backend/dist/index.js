import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { registerRoutes } from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/error-handler.js';
import { authMiddleware } from './middleware/auth.js';
const app = express();
// Security, CORS, JSON, compression, logging
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(authMiddleware);
// Register routes
registerRoutes(app);
// Not found and error handlers
app.use(notFoundHandler);
app.use(errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
