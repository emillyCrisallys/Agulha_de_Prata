import { Request, Response } from 'express'
import UserModel from '../models/UserModel'

export const getAll = async (req: Request, res: Response) => {
    const users = await UserModel.findAll()
    res.send(users) 
}


export const getUserById = async (
    req: Request<{ id: number }>,
    res: Response) => {
   
        const user = await UserModel.findByPk(req.params.id)

        return res.json(user);

}

export const createUser = async (
    req: Request,
    res: Response) => {
    
        const { name, email, document, password } = req.body

        const user = await UserModel.create({
            name,
            email,
            document,
            password
        })

        res.status(201).json(user)

}