import {
    Subjects,
    Publisher,
    ExpirationCompleteEvent
} from '@bluemountains/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
};

