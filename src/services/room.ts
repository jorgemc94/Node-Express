import { ServicesGeneric } from "../utils/services";
import { RoomModel } from "../models/rooms"; 
import { Room } from "../interfaces/Room";

export class RoomService extends ServicesGeneric<Room> {
    constructor() {
        super(RoomModel);
    }
}
