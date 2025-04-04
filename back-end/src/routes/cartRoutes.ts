import { Router } from "express";
import { addToCart, removeFromCart } from "../controllers/cartController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/add", authMiddleware, addToCart); // Adicionar item ao carrinho
router.delete("/remove/:itemId", authMiddleware, removeFromCart); // Remover item do carrinho

export default router;