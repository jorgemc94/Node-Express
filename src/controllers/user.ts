import Express from "express"
import { UserService } from "../services/user";

export const UserController = Express.Router()
const UserHandler = new UserService()

UserController.get('/', UserHandler.getAll);
UserController.get('/:id', UserHandler.getId);
UserController.post('/', UserHandler.post);
UserController.delete('/:id', UserHandler.deleteID);
UserController.put('/:id', UserHandler.put);