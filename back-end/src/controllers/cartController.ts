import { Request, Response } from 'express';
import CartModel from '../models/CartModel';
import ProductModel from '../models/ProductModel';
import UserModel from '../models/UserModel';
import InventoryModel from '../models/InventoryModel';


export const getAll = async (req: Request, res: Response) => {
    const users = await CartModel.findAll()
    res.send(users) 
}


export const getCartByUserId = async (req: Request<{ userId: number }>, res: Response) => {
    const cartItems = await CartModel.findAll({ where: { userId: req.params.userId }, include: [ProductModel] });
    res.json(cartItems);
};

export const addToCart = async (req: Request, res: Response) => {
    try {
        // Verifica se o usuário está logado
        const loggedUser = req.body.user;
        if (!loggedUser) {
            return res.status(401).json({ error: "Acesso negado. Usuário não autenticado." });
        }

        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity === undefined) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        // Verifica se o usuário existe
        const user = await UserModel.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(400).json({ error: "Usuário não encontrado." });
        }

        // Verifica se o produto existe
        const product = await ProductModel.findOne({ where: { id: productId } });
        if (!product) {
            return res.status(400).json({ error: "Produto não encontrado." });
        }

        // Verifica se o produto está no inventário e se há estoque disponível
        const inventory = await InventoryModel.findOne({ where: { productId } });
        if (!inventory) {
            return res.status(400).json({ error: "Produto não encontrado no estoque." });
        }
        if (inventory.quantity < quantity) {
            return res.status(400).json({ error: "Estoque insuficiente para essa quantidade." });
        }

        // Verifica se o item já está no carrinho para esse usuário
        const existingCartItem = await CartModel.findOne({ where: { userId, productId } });

        if (existingCartItem) {
            // Atualiza a quantidade do item no carrinho
            const totalQuantity = existingCartItem.quantity + quantity;

            // Verifica se há estoque suficiente para a nova quantidade
            if (totalQuantity > inventory.quantity) {
                return res.status(400).json({ error: "Quantidade total excede o estoque disponível." });
            }

            existingCartItem.quantity = totalQuantity;
            await existingCartItem.save();
            return res.status(200).json(existingCartItem);
        }

        // Adiciona o item ao carrinho
        const cartItem = await CartModel.create({
            userId,
            productId,
            quantity
        });

        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: "Erro interno no servidor", details: error });
    }
};


export const updateCartItem = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const { quantity } = req.body;
        if (!quantity) return res.status(400).json({ error: 'Quantidade é obrigatória.' });

        const cartItem = await CartModel.findByPk(req.params.id);
        if (!cartItem) return res.status(404).json({ error: 'Item não encontrado no carrinho.' });

        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json('Erro interno no servidor: ' + error);
    }
};


export const removeFromCart = async (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity === undefined) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        // Verifica se o item existe no carrinho
        const cartItem = await CartModel.findOne({ where: { userId, productId } });

        if (!cartItem) {
            return res.status(404).json({ error: "Item não encontrado no carrinho." });
        }

        // Verifica se a quantidade atual do item é suficiente para a remoção
        if (cartItem.quantity !== undefined && cartItem.quantity <= quantity) {
            // Remove o item do carrinho se a quantidade removida for igual ou maior
            // A quantidade atual do item é suficiente para a remoção completa
            await cartItem.destroy();
            return res.status(200).json({ message: "Item removido do carrinho." });
        } else {
            // Apenas reduz a quantidade no carrinho
            cartItem.quantity = (cartItem.quantity ?? 0) - quantity;
            await cartItem.save();
            return res.status(200).json({ message: "Quantidade reduzida no carrinho.", cartItem });
        }

    } catch (error) {
        console.error("Erro ao remover item do carrinho:", error);
        res.status(500).json({ error: "Erro interno no servidor", details: error });
    }
};