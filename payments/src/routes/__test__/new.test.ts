import { OrderStatus } from '@bluemountains/common';
import request from 'supertest';
import { app } from '../../app';
import { newId } from '../../test/helpers';
import { Order } from '../../models/order';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payments';

jest.mock('../../stripe');

it('returns a 404 when purchasing an order that does not exist', async () => {
    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'anything', 
            orderId: newId()
        })
        .expect(404);
});

it('returns a 401 when purchasing an order that does not belong to the user', async () => {
    const order = Order.build({
        id: newId(),
        userId: newId(),
        version: 0,
        price: 20,
        status: OrderStatus.Created,
    });
    await order.save();

    await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
        token: 'anything', 
        orderId: order.id
    })
    .expect(401);

});

it('returns a 400 when purchasing a cancelled order', async () => {
    const userId = newId();

    const order = Order.build({
        id: newId(),
        userId,
        version: 0,
        price: 20,
        status: OrderStatus.Cancelled,
    });
    await order.save();

    await request(app) 
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
            orderId: order.id,
            token: 'anything'
        })
        .expect(400);
});

it('returns a 201 with valid inputs', async () => {
    const userId = newId();
    const price = Math.floor(Math.random() * 100000);

    const order = Order.build({
        id: newId(),
        userId,
        version: 0,
        price,
        status: OrderStatus.Created,
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
            token: 'tok_visa',
            orderId: order.id       
        })
        .expect(201);
    
    const stripeCharges = await stripe.charges.list({ limit: 50 });

    const stripeCharge = stripeCharges.data.find(charge => {
        return charge.amount === price * 100
    });

    const payment = await Payment.findOne({
        orderId: order.id,
        stripeId: stripeCharge!.id
    });

    expect(stripeCharge).toBeDefined();
    expect(stripeCharge!.currency).toEqual('usd');
    expect(payment).toBeDefined();
});