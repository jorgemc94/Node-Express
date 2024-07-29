import mongoose, {Schema} from "mongoose";
import { Room } from "../interfaces/Room";

const RoomSchema = new Schema<Room> ({
    roomNumber: {type:Number, required: true},
    availability: {type:String, required: true},
    roomType: {String},
    description: {type:String, required: true},
    offer: {type:Boolean, required: true},
    price: {type:Number, required: true},
    discount: {type:Number, required: true},
    cancellation: {type:String, required: true},
    amenities: [{type: String, required: true }],
    photosArray: [{type: String, required: true }],
});

export const RoomModel = mongoose.model<Room>('RoomModel', RoomSchema, 'room');