import Express from "express"
import { RoomService } from "../services/room";

export const RoomController = Express.Router()
const RoomHandler = new RoomService()

RoomController.get('/', RoomHandler.getAll);
RoomController.get('/:id', RoomHandler.getId);
RoomController.post('/', RoomHandler.post);
RoomController.delete('/:id', RoomHandler.deleteID);
RoomController.put('/:id', RoomHandler.put);