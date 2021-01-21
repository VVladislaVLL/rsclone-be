import { Response } from 'express';
import { logError } from '../logging/winston.logger';

export class ErrorHandler extends Error {
  public statusCode: number;

  public message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err: ErrorHandler | Error, res: Response) => {
  const error = { statusCode: 500, message: '', ...err } as ErrorHandler;
  if (error.statusCode === 500 || !error.statusCode) {
    logError(error);
  }
  error.message = error.statusCode === 500 ? 'Internal server error' : error.message;
  res.status(error.statusCode).json({
    status: 'error',
    statusCode: error.statusCode,
    message: error.message,
  });
};
