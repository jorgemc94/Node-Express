import Express from "express";
import { ContactService } from "../services/contact";
import { ControllersGeneric } from "../utils/controllers";

const ContactHandler = new ContactService();
export const ContactController = Express.Router();

const { getAll, getbyId, add, deleteID, update } = ControllersGeneric(ContactHandler);

ContactController.get('/', getAll);
ContactController.get('/:id', getbyId);
ContactController.post('/newContact', add);
ContactController.delete('/delete/:id', deleteID);
ContactController.put('/:id', update);
