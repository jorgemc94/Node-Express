import { RoomsData } from "../data/rooms";
import { Room } from "../interfaces/Room";
import { ServicesGeneric } from "../utils/services"; 

export class RoomService extends ServicesGeneric<Room> {
    constructor () {
        super(RoomsData)
    }
}