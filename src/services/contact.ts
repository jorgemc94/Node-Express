import { ServicesGeneric } from "../utils/services";
import { ContactModel } from "../models/contacts"; 
import { Contact } from "../interfaces/Contact";

export class ContactService extends ServicesGeneric<Contact> {
    constructor() {
        super(ContactModel);
    }
}
