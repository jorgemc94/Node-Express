import request from 'supertest';
import { app } from '../app';
import { ContactService } from '../services/contact';
import { ContactsData } from '../data/contacts';



const contactService = new ContactService();

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

    it('getContact returns array of Contacts instances', async () => {
        const res = await request(app)
            .get('/contacts')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(res.body).toEqual({ data: await contactService.getAll() });
    });

    it('getContact returns a single instance of Contacts', async () => {
        const contactId = 1;
        const res = await request(app)
            .get(`/contacts/${contactId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(res.body).toEqual({ data: await contactService.getbyId(contactId) });
    });

    it('addContact returns a single instance of Contacts', async() => {
        const res = await request(app)
          .post('/contacts')
          .send(ContactsData[11])
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json');
    
        expect(res.body).toMatchObject({ data: contactService.post(ContactsData[11]) });
    })

    it('removeContact returns an array of Contacts instances', async() => {
        const contactId = 1;
        const res = await request(app)
        .delete(`/contacts/${contactId}`)
        .send({ id: 1 })
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json');

        expect(res.body).toMatchObject({ data: await contactService.deleteID(1) });
    })

    it('modifyContact returns an array of Contacts instances', async() => {
        const ContactsDataCopy = [...ContactsData];
        ContactsDataCopy[0].client.name = "George Clooney";
        const contactId = 0;
        const res = await request(app)
            .put(`/contacts/${contactId}`)
            .send({ ...ContactsData[0], name: "George Clooney"})
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(res.body).toMatchObject({ data: contactService.put({...ContactsDataCopy[0],client: {...ContactsData[0].client, name: "George Clooney"}}) });
    })
});
