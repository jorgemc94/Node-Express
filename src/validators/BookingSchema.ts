import Joi from "joi";

const statusType = Joi.string().valid("confirmed", "pending", "cancelled");
export const BookingSchema = Joi.object({
    fullName: Joi.string().required(),
    bookDate: Joi.string().isoDate().required(),
    checkIn: Joi.string().isoDate().required(),
    checkOut: Joi.string().isoDate().required(),
    specialRequest: Joi.string().allow('').required(),
    roomId: Joi.number().required(),
    status: statusType.required()
})