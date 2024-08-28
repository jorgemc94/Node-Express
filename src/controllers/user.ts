import Express, { NextFunction, Request, Response } from "express";
import { User } from "../interfaces/User";
import { UserService } from "../services/user"
import { createValidationMiddleware } from "../middleware/validation";
import { UserSchema } from "../validators/UserSchema";

export const UserController = Express.Router();

UserController.get('/', async(_req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const users: User[] = await UserService.getAllUsers();
        return res.json({ users });
    } catch (error) {
        next(error);
    }
})

UserController.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const id: number = parseInt(req.params.id);
        const user = await UserService.getUserById(id);
        return res.json({ user });
    } catch (error) {
        next(error);
    }
});

UserController.post('/', createValidationMiddleware(UserSchema), async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const newUser: User = req.body;
        const addedUser = await UserService.addUser(newUser);
        res.json(addedUser);
    } catch (error) {
        next(error);
    }
})

UserController.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response <JSON> | void> => {
    try {
        const id = parseInt(req.params.id);
        const removedItem = await UserService.deleteUser(id);
        res.json(removedItem);
    } catch (error) {
        next(error);
    }
})

UserController.put('/:id', createValidationMiddleware(UserSchema), async (req: Request, res: Response, next: NextFunction): Promise<Response <JSON> | void> => {
    try {
        const id = parseInt(req.params.id);
        const updatedData = req.body;
        const result = await UserService.updateUser(id, updatedData);
        res.json(result);
    } catch (error) {
        next(error);
    }
})