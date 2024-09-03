import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserService } from '../services/user';

export const loginController = express.Router();

interface userData {
    email: string | null,
    password: string | null,
    name: string | null,
    photo: string | null
}

let userChecked: userData = {email: null, password: null, name: null, photo: null};

loginController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const checked = await checkUser(email, password)

    if (checked) {
        const token = jwt.sign({email, password}, process.env.TOKEN_SECRET || 'secrectKey');
        userChecked.password = password;
        res.json({Token: token, User: userChecked})
    } else {
        const error = new Error ('Invalid Credentials')
        next(error)
    }
    
});

async function checkUser(email: string, password: string): Promise<boolean> {
    try {
        const user = await UserService.getUserByemail(email);
        if (user) {
            userChecked = {email: user.email, password: user.password, name: user.name, photo: user.photo}
            return await bcrypt.compare(password, user.password)
        } else {
            return false
        }
    } catch (error) {
        throw new Error('Error fetching user');
    }
}