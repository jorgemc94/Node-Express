import request from 'supertest';
import { app } from '../app';
import { BookingService } from '../services/booking';
import { BookingsData } from '../data/bookings';

const bookingService = new BookingService();

describe('Booking controller test', () => {
    let token: string;

    beforeEach(async () => {
        const auth = await request(app)
            .post('/login')
            .send({
                email: "jorgemc1294@gmail.com",
                password: "12345"
            })
            .set("Content-Type", "application/json");
        token = auth.body.token;
    });

    it('getBookings returns array of Bookings instances', async () => {
        const res = await request(app)
            .get('/bookings')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(res.body).toEqual({ data: await bookingService.getAll() });
    });

    it('getBooking returns a single instance of Bookings', async () => {
        const bookingId = 1;
        const res = await request(app)
            .get(`/bookings/${bookingId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(res.body).toEqual({ data: await bookingService.getbyId(bookingId) });
    });

    it('addBooking returns a single instance of Bookings', async() => {
        const res = await request(app)
          .post('/bookings')
          .send(BookingsData[11])
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json');
    
        expect(res.body).toMatchObject({ data: bookingService.post(BookingsData[11]) });
    })

    it('removeBooking returns an array of Bookings instances', async() => {
        const bookingId = 1;
        const res = await request(app)
        .delete(`/bookings/${bookingId}`)
        .send({ id: 1 })
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json');

        expect(res.body).toMatchObject({ data: await bookingService.deleteID(1) });
    })

    it('modifyBooking returns an array of Bookings instances', async() => {
        const BookingsDataCopy = [...BookingsData];
        BookingsDataCopy[0].fullName = "George Clooney";
        const bookingId = 0;
        const res = await request(app)
            .put(`/bookings/${bookingId}`)
            .send({ ...BookingsData[0], name: "George Clooney"})
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(res.body).toMatchObject({ data: bookingService.put({...BookingsDataCopy[0], fullName: "George Clooney"}) });
    })
});
