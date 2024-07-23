import Express from "express"
import { BookingService } from "../services/booking"

export const BookingController = Express.Router()
const BookingHandler = new BookingService()

BookingController.get('/', BookingHandler.getAll);
BookingController.get('/:id', BookingHandler.getId);
BookingController.post('/', BookingHandler.post);
BookingController.delete('/:id', BookingHandler.deleteID);
BookingController.put('/:id', BookingHandler.put);
