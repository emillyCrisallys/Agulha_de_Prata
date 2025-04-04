import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Admin from "../models/AdimModel";
import { generateToken } from "../utils/jwt";

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { name, email, password, userId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({ name, email, password: hashedPassword, userId });
        res.status(201).json(admin);
    } catch (error) {
        res.status(500).json({ error: "Error creating admin" });
    }
};

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ where: { email } });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = generateToken(admin.id, true);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Error logging in admin" });
    }
};
