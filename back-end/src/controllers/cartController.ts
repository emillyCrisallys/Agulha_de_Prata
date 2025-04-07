import { Request, Response } from 'express';
import CartModel from '../models/CartModel';
import ProductModel from '../models/ProductModel';


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
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const cartItem = await CartModel.create({ userId, productId, quantity });
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json('Erro interno no servidor: ' + error);
    }
};

export const removeFromCart = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const cartItem = await CartModel.findByPk(req.params.id);
        if (!cartItem) return res.status(404).json({ error: 'Item não encontrado no carrinho.' });

        await cartItem.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json('Erro interno no servidor: ' + error);
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

export const deleteCartItem = async (
    req: Request<{ id: number }>,
    res: Response
) => {
    try {
        const cartItem = await CartModel.findByPk(req.params.id);

        if (!cartItem) {
            return res.status(404).json({ error: 'Item do carrinho não encontrado.' });
        }

        await cartItem.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro interno no servidor: ' + error });
    }
};
