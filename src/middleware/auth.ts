import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { ErrorApi } from "../utils/error";

export function authTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            res.sendStatus(401);
            return;
        }
        try {
            jwt.verify(token, process.env.TOKEN_SECRET!);
                next();
        } catch(error) {
            next(ErrorApi);
        }
}