import { object, string } from 'joi';

const schemas = {
  post: object().keys({
    name: string().required(),
    login: string().required(),
    password: string().required(),
  }),
  put: object().keys({
    _id: string(),
    name: string(),
    login: string(),
    password: string(),
  }),
};

export default schemas;
