import { Router } from 'express';
import { listRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurants.controller.js';

export const restaurantRouter = Router();

restaurantRouter.get('/', listRestaurants);
restaurantRouter.get('/:id', getRestaurant);
restaurantRouter.post('/', createRestaurant);
restaurantRouter.put('/:id', updateRestaurant);
restaurantRouter.delete('/:id', deleteRestaurant);

