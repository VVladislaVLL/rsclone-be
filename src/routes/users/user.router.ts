import express, {
  Request, Response, NextFunction,
} from 'express';
import passport from 'passport';
import { userSchema } from './user.model';
import usersService from './user.service';
import { validateJoi, validateUuid } from '../../validation/validate';
import schemas from './user.schemas';
import { ErrorHandler } from '../../errors/error';

const router = express.Router();

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await usersService.getUsers();
      res.json(users.map(userSchema.statics.toResponse));
      console.log(_req.user);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .post(validateJoi(schemas.post), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await usersService.createUser(req.body);
      res.json(userSchema.statics.toResponse(newUser));
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:id')
  .all(validateUuid(), passport.authenticate('jwt', { session: false }))
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersService.getOneUserById(req.params.id);
      if (user) {
        res.json(userSchema.statics.toResponse(user));
      } else {
        throw new ErrorHandler(404, 'User not found');
      }
    } catch (error) {
      next(error);
    }
  })
  .put(validateJoi(schemas.put), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = { ...req.body, id: req.params.id };
      const updated = await usersService.updateUser(updatedUser);
      if (updated) {
        res.json(userSchema.statics.toResponse(updatedUser));
      } else {
        throw new ErrorHandler(404, 'User not found');
      }
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userDeleted = await usersService.deleteUser(req.params.id);
      if (userDeleted === 1) {
        res.status(204).send('The user has been deleted');
      } else {
        throw new ErrorHandler(404, 'User not found');
      }
    } catch (error) {
      next(error);
    }
  });

export default router;
