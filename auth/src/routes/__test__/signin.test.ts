import request from 'supertest';
import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'notregister@test.com',
            password: 'wrong'
        })
        .expect(400);
})

it('fails when an incorrect password is supplied', async () => { 
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'dario@test.com',
            password:'admin'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signin')
        .send({
            email:'dario@test.com',
            password:'admin11'
        })
        .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'dario@test.com',
            password:'admin'
        })
        .expect(201)
    
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email:'dario@test.com',
            password:'admin'
        })
        .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
})
