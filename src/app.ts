import express, { Response, Request, NextFunction } from 'express';
import { BookingController } from './controllers/booking';
import { ContactController } from './controllers/contact';
import { RoomController } from './controllers/room';
import { UserController } from './controllers/user';
import { ErrorApi } from './utils/error';
import path from 'path';
import mustacheExpress from 'mustache-express';
import { authTokenMiddleware } from './middleware/auth'
import { loginController } from './controllers/login';
import { connectdb } from './db'

const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;

export const app = express();
export const port = 3000;

app.use(express.json());

async function startServer() {
    try {
        await connectdb();
    } catch(error) {
        console.error('Unexpected error occurred', error);
    }
}

startServer();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.get('/', (_req, res) => {
    res.render('index');
});

app.use('/login', loginController)


app.use('/bookings', authTokenMiddleware,BookingController);
app.use('/contacts', authTokenMiddleware,ContactController);
app.use('/rooms',authTokenMiddleware ,RoomController);
app.use('/users',authTokenMiddleware ,UserController);

app.use((error: ErrorApi, _req: Request, res: Response, _next: NextFunction) => {
    res.status(error.status || 500).json({
        message: error.safe ? error.message : 'Error in the application',
    });
});
