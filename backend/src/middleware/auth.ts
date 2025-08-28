import type { Request, Response, NextFunction } from 'express';
import { getFirebaseAdmin } from '../services/firebase.js';

/**
 * Placeholder Firebase Auth middleware.
 * - If FIREBASE_ADMIN envs present, validate token (TODO: real impl)
 * - Otherwise, allow `x-user-id` header for dev
 */
export async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const devUserId = req.header('x-user-id');
  if (devUserId) {
    (req as any).user = { uid: devUserId };
    return next();
  }
  const admin = getFirebaseAdmin();
  if (!admin) return next();
  try {
    const authHeader = req.header('authorization') || req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.substring('Bearer '.length)
      : undefined;
    if (!token) return next();
    const decoded = await admin.auth().verifyIdToken(token);
    (req as any).user = { uid: decoded.uid };
  } catch (_) {
    // ignore and continue unauthenticated
  }
  return next();
}

