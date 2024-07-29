import request from 'supertest';
import { app } from '../app';
import { UserService } from '../services/user';
import { UsersData } from '../data/users';

const userService = new UserService();

describe('User controller test', () => {
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

    it('getUser returns array of Users instances', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(res.body).toEqual({ data: await userService.getAll() });
    });

    it('getUser returns a single instance of Users', async () => {
        const userId = 1;
        const res = await request(app)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(res.body).toEqual({ data: await userService.getbyId(userId) });
    });

    it('addUser returns a single instance of Users', async() => {
        const res = await request(app)
          .post('/users')
          .send(UsersData[11])
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json');
    
        expect(res.body).toMatchObject({ data: userService.post(UsersData[11]) });
    })

    it('removeUser returns an array of Users instances', async() => {
        const userId = 1;
        const res = await request(app)
        .delete(`/users/${userId}`)
        .send({ id: 1 })
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json');

        expect(res.body).toMatchObject({ data: await userService.deleteID(1) });
    })

    it('modifyUser returns an array of User instances', async() => {
        const UsersDataCopy = [...UsersData];
        UsersDataCopy[0].name = "George Clooney";
        const userId = 0;
        const res = await request(app)
            .put(`/users/${userId}`)
            .send({ ...UsersData[0], name: "George Clooney"})
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(res.body).toMatchObject({ data: userService.put({...UsersDataCopy[0], name: "George Clooney"}) });
    })
});
