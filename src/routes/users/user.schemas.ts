import { object, string } from 'joi';

const schemas = {
  post: object().keys({
    login: string().required(),
    password: string().required(),
  }),
  put: object().keys({
    _id: string(),
    login: string(),
    password: string(),
  }),
};

export default schemas;
