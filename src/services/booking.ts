import { ServicesGeneric } from "../utils/services";
import { BookingModel } from "../models/bookings"; 
import { Booking } from "../interfaces/Booking";

export class BookingService extends ServicesGeneric<Booking> {
    constructor() {
        super(BookingModel);
    }
}
