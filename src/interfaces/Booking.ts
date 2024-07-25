import { Identifiable } from "./Identifiable";

export type statusType = "In progress" | "Check In" | "Check Out";

export interface Booking extends Identifiable {
    fullName: string,
    id: number,
    bookDate: string,
    checkIn: string,
    checkOut: string,
    specialRequest: string,
    roomId: number,
    status: statusType,
};