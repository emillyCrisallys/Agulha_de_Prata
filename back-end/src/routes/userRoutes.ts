import { Router } from "express";
import { registerUser, loginUser, updateUser, deleteUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser); // Criar usuário
router.post("/login", loginUser); // Login do usuário
router.put("/:id", authMiddleware, updateUser); // Atualizar usuário
router.delete("/:id", authMiddleware, deleteUser); // Deletar usuário

export default router;