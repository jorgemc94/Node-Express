import request from 'supertest';
import { app } from '../app';
import { RoomService } from '../services/room';
import { RoomsData } from '../data/rooms';

const roomService = new RoomService();

describe('Contact controller test', () => {
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

    it('getRooms returns array of Rooms instances', async () => {
        const res = await request(app)
            .get('/rooms')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(res.body).toEqual({ data: await roomService.getAll() });
    });

    it('getRoom returns a single instance of Rooms', async () => {
        const roomId = 1;
        const res = await request(app)
            .get(`/rooms/${roomId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(res.body).toEqual({ data: await roomService.getId(roomId) });
    });

    it('addRoom returns a single instance of Rooms', async() => {
        const res = await request(app)
          .post('/rooms')
          .send(RoomsData[11])
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json');
    
        expect(res.body).toMatchObject({ data: roomService.post(RoomsData[11]) });
    })

    it('removeRoom returns an array of Rooms instances', async() => {
        const roomId = 1;
        const res = await request(app)
        .delete(`/rooms/${roomId}`)
        .send({ id: 1 })
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json');

        expect(res.body).toMatchObject({ data: await roomService.deleteID(1) });
    })

    it('modifyRoom returns an array of Rooms instances', async() => {
        const RoomsDataCopy = [...RoomsData];
        RoomsDataCopy[0].discount = 40;
        const roomsId = 0;
        const res = await request(app)
            .put(`/rooms/${roomsId}`)
            .send({ ...RoomsData[0], name: "George Clooney"})
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(res.body).toMatchObject({ data: roomService.put({...RoomsDataCopy[0], discount: 40}) });
    })
});
