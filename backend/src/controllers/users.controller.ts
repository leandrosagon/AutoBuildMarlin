import { z } from 'zod';
import type { Request, Response } from 'express';
import { db } from '../services/datastore.js';
import { ok, created, error } from '../utils/response.js';

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  photoUrl: z.string().url().optional(),
});

export function listUsers(_req: Request, res: Response) {
  const data = Array.from(db.users.values());
  return ok(res, 'Users fetched', data, { total: data.length });
}

export function getUser(req: Request, res: Response) {
  const u = db.users.get(req.params.id);
  if (!u) return error(res, 404, 'User not found');
  return ok(res, 'User fetched', u);
}

export function createUser(req: Request, res: Response) {
  const parsed = userSchema.safeParse(req.body);
  if (!parsed.success) return error(res, 400, 'Invalid payload', parsed.error.flatten());
  const now = new Date().toISOString();
  const id = db.generateId();
  const user = { id, createdAt: now, updatedAt: now, ...parsed.data };
  db.users.set(id, user);
  return created(res, 'User created', user);
}

export function updateUser(req: Request, res: Response) {
  const existing = db.users.get(req.params.id);
  if (!existing) return error(res, 404, 'User not found');
  const parsed = userSchema.partial().safeParse(req.body);
  if (!parsed.success) return error(res, 400, 'Invalid payload', parsed.error.flatten());
  const updated = { ...existing, ...parsed.data, updatedAt: new Date().toISOString() };
  db.users.set(existing.id, updated);
  return ok(res, 'User updated', updated);
}

export function deleteUser(req: Request, res: Response) {
  const okDelete = db.users.delete(req.params.id);
  if (!okDelete) return error(res, 404, 'User not found');
  return ok(res, 'User deleted');
}

