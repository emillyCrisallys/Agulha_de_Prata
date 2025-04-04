import { Router } from "express";
import { createAdmin, loginAdmin } from "../controllers/adminController";

const router = Router();

router.post("/register", createAdmin); // Criar admin
router.post("/login", loginAdmin); // Login admin

export default router;
