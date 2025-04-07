import { Request, Response } from 'express';
import InventoryModel from '../models/InventoryModel';

export const getAll = async (req: Request, res: Response) => {
    const inventory = await InventoryModel.findAll();
    res.send(inventory);
};

export const getInventoryByProductId = async (req: Request<{ id: number }>, res: Response) => {
    const inventory = await InventoryModel.findOne({ where: { productId: req.params.id } });
    return inventory ? res.json(inventory) : res.status(404).json({ error: 'Estoque não encontrado.' });
};

export const createInventory = async (req: Request, res: Response) => {
    try {
        const { product_id, quantity } = req.body;

        if (!product_id || quantity === undefined) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const inventory = await InventoryModel.create({
            product_id,
            quantity
        });

        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Erro interno no servidor: ' + error });
    }
};

export const updateInventory = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const { quantity } = req.body;
        if (quantity === undefined) return res.status(400).json({ error: 'Quantidade é obrigatória.' });

        const inventory = await InventoryModel.findOne({ where: { productId: req.params.id } });
        if (!inventory) return res.status(404).json({ error: 'Estoque não encontrado.' });

        inventory.quantity = quantity;
        await inventory.save();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json('Erro interno no servidor: ' + error);
    }
};
