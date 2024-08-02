import mongoose, {Schema} from "mongoose";
import { Contact } from "../interfaces/Contact";

const ContactSchema = new Schema<Contact> ({
    date: {type: String, required: true},
    client: {
        name: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        image: {type: String, required: true},
    },
    subject: {type: String, required: true},
    comment: {type: String, required: true},
    archived: {type: String,enum:["true", "false"], required: true},
})

export const ContactModel = mongoose.model<Contact>('ContactModel', ContactSchema, 'contact');