import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateOrder = [
    body("vinyls").isArray().withMessage("Os vinis devem ser fornecidos em um array."),
    body("totalPrice").isFloat({ gt: 0 }).withMessage("O preço total deve ser um número positivo."),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
