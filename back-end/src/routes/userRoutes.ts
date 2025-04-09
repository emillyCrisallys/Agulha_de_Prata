import express from 'express';
import {getAll, getUserById,createUser,updateUser,destroyUserById} from '../controllers/userController'
import { authMiddleware } from '../middleware/authMiddleware';


const router = express.Router();
// Rota Pública
router.post('/users',createUser)

// rotas privadas
router.get('/users', authMiddleware, getAll)
router.get('/users/:id', authMiddleware, getUserById)
router.put('/users/:id', authMiddleware, updateUser)
router.delete('/users/:id', authMiddleware, destroyUserById)





export default router;