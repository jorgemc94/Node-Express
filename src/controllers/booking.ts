import Express from "express";
import { BookingService } from "../services/booking";
import { ControllersGeneric } from "../utils/controllers";

const BookingHandler = new BookingService();
export const BookingController = Express.Router();

const { getAll, getbyId, add, deleteID, update } = ControllersGeneric(BookingHandler);

BookingController.get('/', getAll);
BookingController.get('/:id', getbyId);
BookingController.post('/newBooking', add);
BookingController.delete('/delete/:id', deleteID);
BookingController.put('/:id', update);
