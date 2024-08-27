
export type statusType = "In progress" | "Check In" | "Check Out";

export interface Booking {
    fullName: string,
    _id?: number,
    bookDate: string,
    checkIn: string,
    checkOut: string,
    specialRequest: string,
    roomId: number,
    status: statusType,
};