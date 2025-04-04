import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export interface AuthRequest extends Request {
    user?: { id: number; isAdmin: boolean };
}

// Middleware para autenticar o token
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Acesso negado, token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; isAdmin: boolean };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Token inválido" });
    }
};

// Middleware para verificar se o usuário é administrador
export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: "Acesso negado, privilégios de administrador necessários" });
    }
    next();
};