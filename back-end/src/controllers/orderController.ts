import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import {Order} from "../models/OrderModel";

export const createOrder = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        const { vinyls, totalPrice } = req.body;

        if (!vinyls || vinyls.length === 0) {
            return res.status(400).json({ error: "O pedido deve conter pelo menos um vinil." });
        }

        const order = await Order.create({
            userId: req.user.id,
            vinyls: JSON.stringify(vinyls),
            totalPrice,
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar pedido" });
    }
};

export const getOrders = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        const orders = await Order.findAll({ where: { userId: req.user.id } });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar pedidos" });
    }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ error: "Apenas administradores podem atualizar pedidos." });
        }

        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: "Pedido não encontrado." });
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar status do pedido" });
    }
};

export const deleteOrder = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ error: "Apenas administradores podem excluir pedidos." });
        }

        const { id } = req.params;
        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ error: "Pedido não encontrado." });
        }

        await order.destroy();
        res.json({ message: "Pedido excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir pedido" });
    }
};
