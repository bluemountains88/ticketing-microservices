import { Ticket } from '../ticket';

it('implements optimistic concurrency contro', async () => {
    // Create an instance of a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 50,
        userId: '123'
    });
    
    // Save the ticket to the database
    await ticket.save();

    // Fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    // Make two separate changes to the tickets we fetchedOrder
    firstInstance!.set({ price: 60 });
    secondInstance!.set ({ price: 70 });

    // Save the first  fetched ticket
    await firstInstance!.save();

    // Save the second ticket fetched and expect an error
    try {
        await secondInstance!.save();
    } catch {
        return;
    }

    throw new Error('Should not reach this point');
});

it('increment the version number on multiple saves', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: 'abc'
    });
    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
    await ticket.save();
    expect(ticket.version).toEqual(3);
});