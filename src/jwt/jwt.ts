import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import util from 'util';
import { ErrorHandler } from '../errors/error';

const secret = Buffer.from(process.env.JWT_SECRET_KEY, 'base64');

const jwtCreate = async (payload: string | object | Buffer) => {
  // const options = {
  //   expiresIn: '7d',
  // };
  const sign = util.promisify(jwt.sign);
  const token = await sign(payload, secret);
  return token;
};

const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      req.originalUrl === '/login'
      || req.originalUrl.startsWith('/doc')
      || req.originalUrl === '/'
      || req.originalUrl === '/favicon.ico'
    ) {
      next();
      return;
    } if (
      req.header('Authorization')
      && req.header('Authorization').startsWith('Bearer ')
    ) {
      const tokenReceived = req.header('Authorization').substring(7);
      const verify = util.promisify(jwt.verify);
      await verify(tokenReceived);
      next();
      return;
    }
    throw new ErrorHandler(401, 'Access token is missing or invalid');
  } catch (err) {
    err.statusCode = 401;
    err.message = 'Access token is missing or invalid';
    next(err);
  }
};

export { jwtCreate, checkJWT };
