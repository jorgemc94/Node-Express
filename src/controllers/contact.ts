import Express, { NextFunction, Request, Response } from "express";
import { Contact } from "../interfaces/Contact";
import { ContactService } from "../services/contact"
import { createValidationMiddleware } from "../middleware/validation";
import { ContactSchema } from "../validators/ContactSchema";

export const ContactController = Express.Router();

ContactController.get('/', async(_req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const contacts: Contact[] = await ContactService.getAllContacts();
        return res.json({ contacts });
    } catch (error) {
        next(error);
    }
})

ContactController.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const id: number = parseInt(req.params.id);
        const contact = await ContactService.getContact(id);
        return res.json({ contact });
    } catch (error) {
        next(error);
    }
});

ContactController.post('/', createValidationMiddleware(ContactSchema), async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const newContact: Contact = req.body;
        const addedContact = await ContactService.addContact(newContact);
        res.json(addedContact);
    } catch (error) {
        next(error);
    }
})

ContactController.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response <JSON> | void> => {
    try {
        const id = parseInt(req.params.id);
        const removedItem = await ContactService.deleteContact(id);
        res.json(removedItem);
    } catch (error) {
        next(error);
    }
})

ContactController.put('/:id', createValidationMiddleware(ContactSchema), async (req: Request, res: Response, next: NextFunction): Promise<Response <JSON> | void> => {
    try {
        const id = parseInt(req.params.id);
        const updatedData = req.body;
        const result = await ContactService.updateContact(id, updatedData);
        res.json(result);
    } catch (error) {
        next(error);
    }
})