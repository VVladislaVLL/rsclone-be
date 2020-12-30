import usersService from '../users/user.service';
import { jwtCreate } from '../../jwt/jwt';
import { ErrorHandler } from '../../errors/error';
import { UserFromLogin } from './login.model';
import { UserMongoose } from '../users/user.model';

const createJWT = async (user: UserMongoose) => {
  const payload = {
    userId: user.id,
    login: user.login,
  };
  const token = await jwtCreate(payload);
  return { token };
};

const authenticate = async (user: UserFromLogin) => {
  const foundUser = await usersService.getOneUserByParams({
    login: user.login,
  });
  if (!foundUser) {
    throw new ErrorHandler(403, 'Incorrect login or password');
  }
  const userMatch = await foundUser.comparePassword(user.password);
  if (!userMatch) {
    throw new ErrorHandler(403, 'Incorrect login or password');
  }
  const createdToken = await createJWT(foundUser);
  return createdToken;
};

export {
  authenticate,
  createJWT,
};
