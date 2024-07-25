import express , { Request, Response } from 'express';
import { LoginService } from '../services/login';

export const loginController = express.Router();

loginController.post('/', (req: Request, res: Response) => {
    try {
    const token: string = LoginService.authenticateUser(req.body.email, req.body.password);
    if (token)
        res.json({ token });
    }
    catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});