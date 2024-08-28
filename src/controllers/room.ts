import Express, { NextFunction, Request, Response } from "express";
import { Room } from "../interfaces/Room";
import { RoomService } from "../services/room"
import { createValidationMiddleware } from "../middleware/validation";
import { RoomSchema } from "../validators/RoomSchema";

export const RoomController = Express.Router();

RoomController.get('/', async(_req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const rooms: Room[] = await RoomService.getAllRooms();
        return res.json({ rooms });
    } catch (error) {
        next(error);
    }
})

RoomController.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const id: number = parseInt(req.params.id);
        const room = await RoomService.getRoomById(id);
        return res.json({ room });
    } catch (error) {
        next(error);
    }
});

RoomController.post('/', createValidationMiddleware(RoomSchema), async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const newRoom: Room = req.body;
        const addedRoom = await RoomService.addRoom(newRoom);
        res.json(addedRoom);
    } catch (error) {
        next(error);
    }
})

RoomController.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response <JSON> | void> => {
    try {
        const id = parseInt(req.params.id);
        const removedItem = await RoomService.deleteRoom(id);
        res.json(removedItem);
    } catch (error) {
        next(error);
    }
})

RoomController.put('/:id', createValidationMiddleware(RoomSchema), async (req: Request, res: Response, next: NextFunction): Promise<Response <JSON> | void> => {
    try {
        const id = parseInt(req.params.id);
        const updatedData = req.body;
        const result = await RoomService.updateRoom(id, updatedData);
        res.json(result);
    } catch (error) {
        next(error);
    }
})