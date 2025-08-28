import type { Response } from 'express';

/** Standard success response wrapper */
export function ok<T>(res: Response, message: string, data?: T, meta?: Record<string, unknown>) {
  return res.status(200).json({ success: true, message, data, meta });
}

/** Standard created response wrapper */
export function created<T>(res: Response, message: string, data?: T) {
  return res.status(201).json({ success: true, message, data });
}

/** Standard error response wrapper */
export function error(res: Response, status: number, message: string, details?: unknown) {
  return res.status(status).json({ success: false, message, details });
}

