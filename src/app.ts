import express, {
  Request, Response, NextFunction,
} from 'express';
import logger from 'morgan';
import passport from 'passport';
import userRouter from './routes/users/user.router';
import authRouter from './routes/auth/auth.router';
import gameRouter from './routes/games/game.router';
import { handleError, ErrorHandler } from './errors/error';

const app = express();

app.use(express.json());

app.use(logger('dev'));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(passport.initialize());
require('./routes/auth/auth.service');

app.use('/users', userRouter);
app.use('/games', gameRouter);
app.use('/auth', authRouter);

app.use(() => {
  throw new ErrorHandler(404, 'Not found');
});

app.use((err: ErrorHandler | Error, _req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
  next(err);
});

export default app;
