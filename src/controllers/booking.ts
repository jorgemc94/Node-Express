import Express, { NextFunction, Request, Response } from "express";
import { Booking } from "../interfaces/Booking";
import { BookingService } from "../services/booking"
import { createValidationMiddleware } from "../middleware/validation";
import { BookingSchema } from "../validators/BookingSchema";

export const BookingController = Express.Router();

BookingController.get('/', async(_req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const bookings: Booking[] = await BookingService.getAllBookings();
        return res.json({ bookings });
    } catch (error) {
        next(error);
    }
})

BookingController.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const id: number = parseInt(req.params.id);
        const booking = await BookingService.getBooking(id);
        return res.json({ booking });
    } catch (error) {
        next(error);
    }
});

BookingController.post('/', createValidationMiddleware(BookingSchema), async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const newBooking: Booking = req.body;
        const addedBooking = await BookingService.addBooking(newBooking);
        res.json(addedBooking);
    } catch (error) {
        next(error);
    }
})

BookingController.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response <JSON> | void> => {
    try {
        const id = parseInt(req.params.id);
        const removedItem = await BookingService.deleteBooking(id);
        res.json(removedItem);
    } catch (error) {
        next(error);
    }
})

BookingController.put('/:id', createValidationMiddleware(BookingSchema), async (req: Request, res: Response, next: NextFunction): Promise<Response <JSON> | void> => {
    try {
        const id = parseInt(req.params.id);
        const updatedData = req.body;
        const result = await BookingService.updateBooking(id, updatedData);
        res.json(result);
    } catch (error) {
        next(error);
    }
})