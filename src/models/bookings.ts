import mongoose, { Schema } from "mongoose";
import { Booking } from "../interfaces/Booking";

const BookingSchema = new Schema<Booking>({
    fullName: { type: String, required: true },
    bookDate: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    specialRequest: { type: String, required: true },
    roomId: { type: Number, required: true },
    status: { type: String, enum: ["In progress", "Check In", "Check Out"], required: true },
});

export const BookingModel = mongoose.model<Booking>('BookingModel', BookingSchema, 'bookings');
