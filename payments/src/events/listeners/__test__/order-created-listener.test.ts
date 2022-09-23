import { OrderCreatedEvent, OrderStatus } from '@bluemountains/common';
import { Order } from '../../../models/order';
import { natsWrapper } from '../../../nats-wrapper';
import { newId } from '../../../test/helpers';
import { OrderCreatedListener } from '../order-created-listener';
import { Message } from 'node-nats-streaming';

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);
    
    const data: OrderCreatedEvent['data'] = {
        id: newId(),
        version: 0,
        expiresAt: 'newdate',
        userId: newId(),
        status: OrderStatus.Created,
        ticket: {
            id: newId(),
            price: 20,
        },
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, data, msg }; 
};

it('replicas the order info', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const order = await Order.findById(data.id);
  
    expect(order!.price).toEqual(data.ticket.price);
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

