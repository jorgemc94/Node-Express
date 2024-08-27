export type availabilityType = "available" | "booked";

export interface Room {
    _id?: number;
    roomNumber: number,
    availability: availabilityType,
    roomType: string,
    description: string,
    offer: boolean,
    price: number,
    discount: number,
    cancellation: string,
    booking_id: number,
    amenities: string[],
    photosArray: string[],
}