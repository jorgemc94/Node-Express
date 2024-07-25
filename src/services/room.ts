import { ServicesGeneric } from "../utils/services";
import { RoomsData } from "../data/rooms";
import { Room } from "../interfaces/Room";

export class RoomService extends ServicesGeneric<Room> {
    constructor () {
        super(RoomsData);
    }
}
