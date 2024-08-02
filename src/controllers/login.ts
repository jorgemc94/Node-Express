import express, { Request, Response } from 'express';
import { LoginService } from '../services/login';

export const loginController = express.Router();

loginController.post('/', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const token: string = await LoginService.authenticateUser(email, password);
        return res.json({ token });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({ error: error.message });
        } else {
            return res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
