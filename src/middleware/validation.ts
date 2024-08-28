import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";


export function createValidationMiddleware(schema: ObjectSchema) {
    return(req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body, {abortEarly: false});
        if (error) {
            console.error('Validation error: ', error)
            return res.status(400).json({error: error.message})
        }

        next();
        return
    }
}