import {Request, Response} from 'express';
import { AuthService } from '../services/AuthService';



export class AuthController {
    
    authService = new AuthService()

    async register(req: Request, res: Response) {
        try {
            const {name, email, password} = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: "Campos obrigatórios ausentes."});
            }

            const hashedPassword = await this.authService.hashPassword(password);


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

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const userPasswordHash = "$2b$10$wKnN7Hok8aregL5P8zcPB.rDDoDADHwlYpaFNVKAMC/W4wXDFkaW2";

        const isPasswordValid = await this.authService.validadeLogin(password, userPasswordHash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "E-mail ou senha inválidos "});
        }

        return res.json({
            message: "Login realizado com sucesso!",
            token: "simulacao-de-jwt-token"
        });
    }



}