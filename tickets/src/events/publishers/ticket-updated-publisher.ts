import { Publisher, Subjects, TicketUpdatedEvent } from '@bluemountains/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated; 
}