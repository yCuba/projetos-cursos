import {Request, Response} from 'express';
import { AuthService } from '../services/AuthService';

const authService = new AuthService()

export class AuthController {

    async register(req: Request, res: Response) {
        try {
            const {name, email, password} = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: "Campos obrigatórios ausentes."});
            }

            const hashedPassword = await authService.hashPassword(password);


            return res.status(201).json({
                message: "Usuário preparado para salvamento!",
                user: {
                    name,
                    email,
                    passwordStored: hashedPassword
                }
            });
        } catch (error) {
            return res.status(500).json({error: "Erro interno no servidor."});
        }
    } 



}