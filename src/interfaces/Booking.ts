import { Identifiable } from "./Identifiable";

export type statusType = "In progress" | "Check In" | "Check Out";

export interface Booking extends Identifiable {
    fullName: string,
    _id?: string,
    bookDate: string,
    checkIn: string,
    checkOut: string,
    specialRequest: string,
    roomId: string,
    status: statusType,
};