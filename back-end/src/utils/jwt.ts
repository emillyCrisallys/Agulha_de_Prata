import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const generateToken = (userId: number, isAdmin: boolean = false): string => {
    return jwt.sign({ userId, isAdmin }, JWT_SECRET, {
        expiresIn: "7d"
    });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};
