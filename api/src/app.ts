import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import ErrorHandler from './middlewares/errorHandler';
import { userRoutes } from './routes/userRoutes';
import { authRoutes } from './routes/authRoutes';
import { validateCookieMiddleware } from './middlewares/validateCookieMiddleware';
import { cookieSchema } from './schema/cookieSchema';
import { bookRoutes } from './routes/bookRoutes';

export const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/users', validateCookieMiddleware(cookieSchema), userRoutes);
app.use('/books', validateCookieMiddleware(cookieSchema), bookRoutes);

app.all('*', (req: Request, res: Response) => {
    res.status(404).end();
});

app.use(ErrorHandler.convert());
app.use(ErrorHandler.handle());
