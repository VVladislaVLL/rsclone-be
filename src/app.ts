import express, {
  Request, Response,
} from 'express';
import logger from 'morgan';
import todoRouter from './routes/todos';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/todos', todoRouter);

// catch 404 and forward to error handler
app.use((_req: Request, res: Response) => {
  res.json({
    statusCode: 404,
  });
});

// error handler
app.use((err: Error, _req: Request, res: Response) => {
  res.json({
    statusCode: 500,
    message: err.message,
    stack: err.stack,
  });
});

export default app;
