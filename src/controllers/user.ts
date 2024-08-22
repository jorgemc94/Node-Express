import Express from "express";
import { UserService } from "../services/user";
import { ControllersGeneric } from "../utils/controllers";

const UserHandler = new UserService();
export const UserController = Express.Router();

const { getAll, getbyId, add, deleteID, update } = ControllersGeneric(UserHandler);

UserController.get('/', getAll);
UserController.get('/:id', getbyId);
UserController.post('/', add);
UserController.delete('/:id', deleteID);
UserController.put('/:id', update);
