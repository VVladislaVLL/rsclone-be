import express, { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../../errors/error';
import { JWT_SECRET_KEY } from '../../common/config';

const router = express.Router();

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req: Request, res: Response) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  },
);

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      // eslint-disable-next-line consistent-return
      async (err, user) => {
        try {
          if (err || !user) {
            throw new ErrorHandler(404, 'Incorrect login or password');
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { login: user.login, id: user.id };
              const token = jwt.sign({ user: body }, JWT_SECRET_KEY);

              return res.json({ token });
            },
          );
        } catch (error) {
          return next(error);
        }
      },
    )(req, res, next);
  },
);

export default router;
