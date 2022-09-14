import request from 'supertest';
import { app } from '../../app';

const createTicket = async () => {
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title:"title1",
        price: 20
    })
    .expect(201);
}

it('can fetch a list of tickets', async () => {
    for(let i = 0; i<10; i++) await createTicket();

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200)
    expect(response.body.length).toEqual(10);
});