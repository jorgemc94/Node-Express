import Joi from "joi";

const nameType = Joi.string().valid("Manager", "Room service", "Reception");
const statusType = Joi.string().valid("valid", "invalid");

export const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9\-\+\(\)\s]*$/).required(),
    photo: Joi.string().uri().required(),
    position: Joi.object({
        name: nameType.required(),
        description: Joi.string().required()
    }).required(),
    date: Joi.string().isoDate().required(),
    status: statusType.required(),
    password: Joi.string().min(5).required()
})