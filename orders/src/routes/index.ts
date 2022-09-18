import express from 'express';

import { listOrdersRouter } from './list';
import { deleteOrderRouter } from './delete';
import { showOrderRouter } from './show';
import { newOrderRouter } from './new';

const router = express.Router();

router.use(listOrdersRouter);
router.use(deleteOrderRouter);
router.use(showOrderRouter);
router.use(newOrderRouter);

export { router as indexRouter };