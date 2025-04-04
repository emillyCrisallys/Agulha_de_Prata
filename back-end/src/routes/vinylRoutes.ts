import { Router } from "express";
import { getAllVinyls, getVinylById, createVinyl, updateVinyl, deleteVinyl } from "../controllers/vinylController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getAllVinyls); // Listar todos os vinis
router.get("/:id", getVinylById); // Buscar um vinil pelo ID
router.post("/", authMiddleware, adminMiddleware, createVinyl); // Criar novo vinil (Apenas Admin)
router.put("/:id", authMiddleware, adminMiddleware, updateVinyl); // Atualizar vinil (Apenas Admin)
router.delete("/:id", authMiddleware, adminMiddleware, deleteVinyl); // Deletar vinil (Apenas Admin)

export default router;
