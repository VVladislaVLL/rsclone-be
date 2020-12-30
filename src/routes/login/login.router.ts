import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from './login.service';
import { ErrorHandler } from '../../errors/error';

const router = express.Router();

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await authenticate(req.body);
    if (token) {
      res.status(200).json(token);
    } else {
      throw new ErrorHandler(403, 'Incorrect login or password');
    }
  } catch (err) {
    next(err);
  }
});

export default router;
