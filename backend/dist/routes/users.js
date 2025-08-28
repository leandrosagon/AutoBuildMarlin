import { Router } from 'express';
import { listUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.controller.js';
export const userRouter = Router();
userRouter.get('/', listUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);
