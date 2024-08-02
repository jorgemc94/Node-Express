import Express from "express";
import { UserService } from "../services/user";
import { ControllersGeneric } from "../utils/controllers";

const UserHandler = new UserService();
export const UserController = Express.Router();

const { getAll, getbyId, post, deleteID, put } = ControllersGeneric(UserHandler);

UserController.get('/', getAll);
UserController.get('/:id', getbyId);
UserController.post('/', post);
UserController.delete('/:id', deleteID);
UserController.put('/:id', put);
