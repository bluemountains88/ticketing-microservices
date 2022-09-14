import express from 'express';
import { createTicketRouter } from './new';
import { showTicketRouter } from './show';
import { listTicketsRouter } from './list';
import { updateTicketRouter } from './update';

const router = express.Router();

router.use(createTicketRouter);
router.use(showTicketRouter);
router.use(listTicketsRouter);
router.use(updateTicketRouter);

export { router as indexRouter }