import express, {
  Request, Response, NextFunction,
} from 'express';
import logger from 'morgan';
import userRouter from './routes/users/user.router';
import loginRouter from './routes/login/login.router';
import { handleError, ErrorHandler } from './errors/error';
// import { checkJWT } from './jwt/jwt';

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

// app.use(checkJWT);

app.use('/users', userRouter);
app.use('/login', loginRouter);

app.use(() => {
  throw new ErrorHandler(404, 'Not found');
});

app.use((err: ErrorHandler | Error, _req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
  next(err);
});

export default app;
