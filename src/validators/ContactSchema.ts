import Joi from "joi";

const archivedType = Joi.string().valid("archived", "active", "deleted");
export const ContactSchema = Joi.object({
    date: Joi.string().isoDate().required(), 
    client: Joi.object({
        name: Joi.string().required(), 
        email: Joi.string().email().required(), 
        phone: Joi.string().pattern(/^[0-9\-\+\(\)\s]*$/).required(), 
        image: Joi.string().uri().required(), 
    }).required(),
    _id: Joi.number().optional(),
    subject: Joi.string().required(),
    comment: Joi.string().required(), 
    archived: archivedType.required()
})