import Express from 'express';
import { BookingController } from './controllers/booking';
import { ContactController } from './controllers/contact';
import { RoomController } from './controllers/room';
import { UserController } from './controllers/user';

export const app = Express();
export const port = 3000;
app.use(Express.json())


app.use('/bookings', BookingController);
app.use('/contacts', ContactController);
app.use('/rooms', RoomController);
app.use('/users', UserController);