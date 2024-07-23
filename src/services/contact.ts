import { ContactsData } from "../data/contacts";
import { Contact } from "../interfaces/Contact";
import { ServicesGeneric } from "../utils/services";


export class ContactService extends ServicesGeneric<Contact> {
    constructor() {
        super(ContactsData)
    }
}