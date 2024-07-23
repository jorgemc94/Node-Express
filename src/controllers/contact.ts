import Express from "express"
import { ContactService } from "../services/contact";

export const ContactController = Express.Router()
const ContactHandler = new ContactService()

ContactController.get('/', ContactHandler.getAll);
ContactController.get('/:id', ContactHandler.getId);
ContactController.post('/', ContactHandler.post);
ContactController.delete('/:id', ContactHandler.deleteID);
ContactController.put('/:id', ContactHandler.put);