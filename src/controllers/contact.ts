import Express from "express";
import { ContactService } from "../services/contact";
import { ControllersGeneric } from "../utils/controllers";

const ContactHandler = new ContactService();
export const ContactController = Express.Router();

const { getAll, getbyId, post, deleteID, put } = ControllersGeneric(ContactHandler);

ContactController.get('/', getAll);
ContactController.get('/:id', getbyId);
ContactController.post('/', post);
ContactController.delete('/:id', deleteID);
ContactController.put('/:id', put);
