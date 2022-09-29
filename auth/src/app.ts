import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import 'express-async-errors';

import { indexRouter } from './routes';
import { errorHandler,NotFoundError } from '@bluemountains/common';

const app = express();
app.set('trust proxy', true); //by nginx
app.use(json());

app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);

app.use(indexRouter);
app.all('*', async () => { throw new NotFoundError() });
app.use(errorHandler);

export { app };