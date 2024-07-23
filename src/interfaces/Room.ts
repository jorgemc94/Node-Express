export interface Room {
    id: number;
    roomNumber: number;
    availability: "available" | "booked";
    roomType: string;
    description: string;
    offer: boolean;
    price: number;
    discount: number;
    cancellation: string;
    amenities: string[];
    photosArray: string[];
}