import Joi from "joi";

const availabilityType = Joi.string().valid("available", "booked", "maintenance");

export const RoomSchema = Joi.object({
    roomNumber: Joi.number().required(),
    availability: availabilityType.required(),
    roomType: Joi.string().required(),
    description: Joi.string().required(),
    offer: Joi.boolean().required(),
    price: Joi.number().positive().required(),
    discount: Joi.number().min(0).max(100).required(),
    cancellation: Joi.string().required(),
    amenities: Joi.array().items(Joi.string()).required(),
    photosArray: Joi.array().items(Joi.string().uri()).required()
})