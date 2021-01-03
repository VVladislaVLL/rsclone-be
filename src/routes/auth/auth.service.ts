import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { JWT_SECRET_KEY } from '../../common/config';
import { UserFromInput } from '../users/user.model';
import userService from '../users/user.service';

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password',
    },
    async (login, password, done) => {
      try {
        const user = await userService.createUser({ login, password } as UserFromInput);
        return done(null, user);
      } catch (error) {
        done(error);
        return undefined;
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password',
    },
    async (login, password, done) => {
      try {
        const user = await userService.getOneUserByParams({ login });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.comparePassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: JWT_SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token: {user: {login: string, id: string}}, done: Function) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
        return undefined;
      }
    },
  ),
);

// https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport
