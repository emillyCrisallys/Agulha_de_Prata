import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/UserModel";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/authMiddleware";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const token = generateToken(user.id);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Erro ao fazer login" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
};

// Função para deletar um usuário
export const deleteUser = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        const { id } = req.params;

        // Verifica se o usuário autenticado está tentando deletar a si mesmo
        if (req.user.id !== parseInt(id)) {
            return res.status(403).json({ error: "Você só pode deletar sua própria conta" });
        }

        // Busca o usuário no banco de dados
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Deleta o usuário
        await user.destroy();

        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar usuário" });
    }
};