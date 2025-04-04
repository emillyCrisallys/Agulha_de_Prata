import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: "Acesso negado. Requer permissão de administrador." });
    }
    next();
};
