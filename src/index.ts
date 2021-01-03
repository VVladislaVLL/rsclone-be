/* eslint-disable no-param-reassign */
import { PORT } from './common/config';
import app from './app';
import { connectToDB } from './db/db.client';
import { ErrorHandler } from './errors/error';

process
  .on('unhandledRejection', (reason: ErrorHandler) => {
    reason.statusCode = 500;
    reason.message = `Unhandled Rejection at Promise: ${reason.message}`;
    console.error(reason);
    process.exit(1);
  })
  .on('uncaughtException', (err: ErrorHandler) => {
    err.statusCode = 500;
    err.message = `Uncaught Exception: ${err.message}`;
    console.error(err);
    process.exit(1);
  });

connectToDB(() => {
  app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
});
