import { Router } from "express";
import { createOrder, getOrders, updateOrderStatus, deleteOrder } from "../controllers/orderController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createOrder); // Criar pedido (Usuário autenticado)
router.get("/", authMiddleware, getOrders); // Listar pedidos do usuário autenticado
router.put("/:id", authMiddleware, adminMiddleware, updateOrderStatus); // Atualizar status (Apenas Admin)
router.delete("/:id", authMiddleware, adminMiddleware, deleteOrder); // Deletar pedido (Apenas Admin)

export default router;
