import { ServicesGeneric } from "../utils/services";
import { ContactsData } from "../data/contacts";
import { Contact } from "../interfaces/Contact";

export class ContactService extends ServicesGeneric<Contact> {
    constructor () {
        super(ContactsData);
    }
}
