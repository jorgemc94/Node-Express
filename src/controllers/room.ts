import Express from "express";
import { RoomService } from "../services/room";
import { ControllersGeneric } from "../utils/controllers";

const RoomHandler = new RoomService();
export const RoomController = Express.Router();

const { getAll, getbyId, post, deleteID, put } = ControllersGeneric(RoomHandler);

RoomController.get('/', getAll);
RoomController.get('/:id', getbyId);
RoomController.post('/', post);
RoomController.delete('/:id', deleteID);
RoomController.put('/:id', put);
