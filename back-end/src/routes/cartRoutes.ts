import express from 'express';
import {getAll,addToCart,removeFromCart,updateCartItem,deleteCartItem } from '../controllers/cartController'



const router = express.Router();

router.get('/cart',getAll)
router.get('/cart/:id',addToCart)
router.post('/cart',removeFromCart)
router.put('/cart/:id',updateCartItem)
router.delete('/cart/:id',deleteCartItem)






export default router;