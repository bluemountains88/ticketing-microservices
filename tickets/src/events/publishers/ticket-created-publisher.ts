import { 
    Publisher,
    Subjects,
    TicketCreatedEvent
} from '@bluemountains/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
};

