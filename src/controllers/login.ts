import express, { Request, Response, NextFunction } from 'express';
import { LoginService } from '../services/login';
import { UserService } from '../services/user';


export const loginController = express.Router();

loginController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = await LoginService.authenticateUser(req.body)
        const userData = await UserService.getUserById(req.body.name)

        if(token) {
            res.json({token, userData});
        }
        
    } catch (error: any) {
        next(new Error('Invalid credentials'))
    }
    
});
