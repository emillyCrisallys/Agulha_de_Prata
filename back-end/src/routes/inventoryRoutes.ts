import express from 'express';
import {getAll, getInventoryByProductId,updateInventory,createInventory } from '../controllers/inventoryController'



const router = express.Router();


router.get('/inventory',getAll)
router.get('/inventory/:id',getInventoryByProductId)
router.put('/inventory/:id',updateInventory) 
router.post('/inventory',createInventory)   



export default router;