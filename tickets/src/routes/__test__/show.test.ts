import request from 'supertest';
import { app } from '../../app';
import { newId } from '../../test/helpers';

it('returns a 404 if the ticket is not found', async () => {
    const id = newId();
   
    const response = await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404);
});

it('returns the ticket if the ticket is found', async () => {
    const title = 'Concert';
    const price = 20;
    
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price,
        })
        .expect(201);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);
    
    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});