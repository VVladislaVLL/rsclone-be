import { Schema } from 'joi';
import {
  Request, Response, NextFunction,
} from 'express';
import { ErrorHandler } from '../errors/error';

const validateJoi = (schema: Schema) => (req: Request, _res: Response, next: NextFunction) => {
  console.dir(req.body);
  const result = schema.validate(req.body);
  if (result.error) {
    console.log(result);
    const err = new ErrorHandler(400, 'Invalid request body');
    next(err);
    return;
  }
  next();
};

const validateUuid = () => (req: Request, _res: Response, next: NextFunction) => {
  const re = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    'i',
  );
  const params = ['_id', 'boardId', 'taskId'];
  params.forEach((elem) => {
    if (req.params[elem]) {
      const result = re.test(req.params[elem]);
      if (!result) {
        const err = new ErrorHandler(
          400,
          'Invalid request. The ID string is not a UUID',
        );
        next(err);
      }
    }
  });
  next();
};

export { validateJoi, validateUuid };
