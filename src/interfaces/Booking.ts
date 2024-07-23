
export interface Booking {
    fullName: string,
    id: number,
    bookDate: string,
    checkIn: string,
    checkOut: string,
    specialRequest: string,
    roomId: number,
    status: "In progress" | "Check In" | "Check Out"
}