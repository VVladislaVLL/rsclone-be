import {
  boolean, number, object, string,
} from 'joi';

const schemas = {
  post: object().keys({
    user: string().required(),
    level: number().required(),
    suns: number(),
    win: boolean(),
    zombiesKilled: number(),
    plantsPlanted: number(),
  }),
  put: object().keys({
    _id: string(),
    level: number().required(),
    suns: number(),
    win: boolean(),
    zombiesKilled: number(),
    plantsPlanted: number(),
  }),
};

export default schemas;
