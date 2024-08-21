import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/users';
import bcrypt from 'bcryptjs';

export const loginController = express.Router();

interface userData {
    email: string | null,
    password: string | null
}

let userChecked: userData = {email: null, password: null};

loginController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const checked = await checkUser(email, password)

    if (checked) {
        const token = jwt.sign({email, password}, process.env.TOKEN_SECRET || 'secrectKey', {expiresIn: '1h'});
        userChecked.password = password;
        res.json({Token: token, User: userChecked})
    } else {
        const error = new Error ('Invalid Credentials')
        next(error)
    }
    
});

async function checkUser(email: string, password: string): Promise<boolean> {
    try {
        const user = await UserModel.findOne({email: email}).exec();
        if (user) {
            userChecked = {email: user.email, password: user.password}
            return await bcrypt.compare(password, user.password)
        } else {
            return false
        }
    } catch (error) {
        throw new Error('Error fetching user');
    }
}