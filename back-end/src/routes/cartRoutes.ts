import express from 'express';
import {getAll,getCartByUserId,addToCart,removeFromCart,updateCartItem} from '../controllers/cartController'
import { authMiddleware } from '../middleware/authMiddleware';


const router = express.Router();

router.get('/cart',getAll)
router.get('/cart/:id',getCartByUserId)
router.post('/cart',authMiddleware,addToCart)
router.put('/cart/:id',updateCartItem)
router.delete('/cart/:id',removeFromCart)





export default router;