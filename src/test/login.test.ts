const request = require('supertest');
const { app }  = require('../app');

describe("Authentication tests", () => {
    it('El middleware de autenticación niega las solicitudes de los usuarios que no han iniciado sesión', async () => {
        const res = await request(app)
          .get('/bookings');
    
        expect(res.status).toBe(401);
      })
    
      it('El middleware de autenticación niega las solicitudes de los usuarios si las credenciales no son correctas', async () => {
        const res = await request(app)
          .post('/login')
          .send({
              "username": "Pepe",
              "password": "Botica"
          })
          .set("Content-Type", "application/json");
    
          expect(res.status).toBe(401);
      })
})