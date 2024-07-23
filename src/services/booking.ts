import { ServicesGeneric } from "../utils/services"; 
import { BookingsData } from "../data/bookings";
import { Booking } from "../interfaces/Booking";

export class BookingService extends ServicesGeneric<Booking> {
    constructor () {
        super(BookingsData)
    }
}