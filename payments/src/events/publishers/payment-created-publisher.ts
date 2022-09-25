import { Subjects, Publisher, PaymentCreatedEvent } from '@bluemountains/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
};