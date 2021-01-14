import {
  boolean, number, object, string,
} from 'joi';

const schemas = {
  post: object().keys({
    level: number().required(),
    win: boolean(),
    zombiesKilled: number(),
    plantsPlanted: number(),
  }),
  put: object().keys({
    _id: string(),
    level: number().required(),
    win: boolean(),
    zombiesKilled: number(),
    plantsPlanted: number(),
  }),
};

export default schemas;
