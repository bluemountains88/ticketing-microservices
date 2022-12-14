import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';
import { newId } from '../../test/helpers';

it('marks an order as cancelled', async () => {
    const user = global.signin();
    
    // Create a ticket
    const ticket = Ticket.build({
        id: newId(),
        title: 'Concert',
        price: 20
    });
    await ticket.save();

    // Make a request to create an order
    const { body: order } = await request(app) 
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201)
    
    // Make a request to cancel the order
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204)

    // Check that the order is cancelled
    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits a order cancelled event', async () => {
    const user = global.signin();
    
    // Create a ticket
    const ticket = Ticket.build({
        id: newId(),
        title: 'Concert',
        price: 20
    });
    await ticket.save();

    // Make a request to create an order
    const { body: order } = await request(app) 
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201)
    
    // Make a request to cancel the order
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204)

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});