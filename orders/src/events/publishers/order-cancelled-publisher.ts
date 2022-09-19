import { 
    Publisher,
    OrderCancelledEvent,
    Subjects
} from '@bluemountains/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
};