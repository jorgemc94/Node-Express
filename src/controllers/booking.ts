import Express from "express";
import { BookingService } from "../services/booking";
import { ControllersGeneric } from "../utils/controllers";

const BookingHandler = new BookingService();
export const BookingController = Express.Router();

const { getAll, getId, post, deleteID, put } = ControllersGeneric(BookingHandler);

BookingController.get('/', getAll);
BookingController.get('/:id', getId);
BookingController.post('/', post);
BookingController.delete('/:id', deleteID);
BookingController.put('/:id', put);
