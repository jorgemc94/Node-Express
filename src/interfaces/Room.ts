export type availabilityType = "available" | "booked";

export interface Room {
    _id?: number;
    roomNumber: number,
    status: availabilityType,
    roomType: string,
    description: string,
    offer: boolean,
    price: number,
    discount: number,
    cancellation: string,
    amenities: string[],
    photosArray: string[],
}