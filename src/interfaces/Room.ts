export type availabilityType = "available" | "booked";

export interface Room {
    id: number;
    roomNumber: number,
    availability: availabilityType,
    roomType: string,
    description: string,
    offer: boolean,
    price: number,
    discount: number,
    cancellation: string,
    amenities: string[],
    photosArray: string[],
}