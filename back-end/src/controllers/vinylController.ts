import { Request, Response } from "express";
import Vinyl from "../models/VinylModel";

export const getAllVinyls = async (req: Request, res: Response) => {
    try {
        const vinyls = await Vinyl.findAll();
        res.json(vinyls);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar vinis" });
    }
};

export const getVinylById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vinyl = await Vinyl.findByPk(id);

        if (!vinyl) {
            return res.status(404).json({ error: "Vinil não encontrado" });
        }

        res.json(vinyl);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar vinil" });
    }
};

export const createVinyl = async (req: Request, res: Response) => {
    try {
        const { title, artist, price, imageUrl } = req.body;
        const vinyl = await Vinyl.create({ title, artist, price, imageUrl });
        res.status(201).json(vinyl);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar vinil" });
    }
};

export const updateVinyl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, artist, price, imageUrl } = req.body;

        const vinyl = await Vinyl.findByPk(id);
        if (!vinyl) {
            return res.status(404).json({ error: "Vinil não encontrado" });
        }

        vinyl.title = title || vinyl.title;
        vinyl.artist = artist || vinyl.artist;
        vinyl.price = price || vinyl.price;
        vinyl.imageUrl = imageUrl || vinyl.imageUrl;

        await vinyl.save();
        res.json(vinyl);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar vinil" });
    }
};

export const deleteVinyl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vinyl = await Vinyl.findByPk(id);
        if (!vinyl) {
            return res.status(404).json({ error: "Vinil não encontrado" });
        }

        await vinyl.destroy();
        res.json({ message: "Vinil excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir vinil" });
    }
};
