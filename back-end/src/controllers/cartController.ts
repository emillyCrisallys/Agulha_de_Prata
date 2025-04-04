import { Request, Response } from "express";
import Cart from "../models/CartModel";
import Vinyl from "../models/VinylModel";
import { AuthRequest } from "../middleware/authMiddleware";

interface LocalAuthRequest extends Request {
    user?: { id: number };
}

export const addToCart = async (req: LocalAuthRequest, res: Response) => {
    try {

        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.user; 
        const { vinylId, quantity } = req.body;

        const cartItem = await Cart.create({
            userId: id,
            vinylId,
            quantity,
        });

        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: "Error adding to cart" });
    }
};
export const removeFromCart = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        const { itemId } = req.params;

      
        const cartItem = await Cart.findOne({
            where: { id: itemId, userId: req.user.id },
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Item não encontrado no carrinho" });
        }

        // Remove o item do carrinho
        await cartItem.destroy();

        res.status(200).json({ message: "Item removido do carrinho com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover item do carrinho" });
    }
};