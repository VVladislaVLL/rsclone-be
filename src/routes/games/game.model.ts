import mongoose, { Schema, model } from 'mongoose';
import { uuid } from 'uuidv4';

export interface GameMongoose extends mongoose.Document {
  id: string;
  user: string;
  level: number;
  suns: number;
  win: boolean;
  zombiesKilled: number;
  plantsPlanted: number;
}

export interface GameFromInput {
  id: GameMongoose['id'];
  user: GameMongoose['user'];
  level: GameMongoose['level'];
  suns: GameMongoose['suns'];
  win: GameMongoose['win'];
  zombiesKilled: GameMongoose['zombiesKilled'];
  plantsPlanted: GameMongoose['plantsPlanted'];
}

export type ParamsObject = {[dynamic: string]: string | number | boolean};

export const gameSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid,
    },
    user: String,
    level: Number,
    suns: Number,
    win: Boolean,
    zombiesKilled: Number,
    plantsPlanted: Number,
  },
  { versionKey: false },
);

gameSchema.statics.toResponse = (game: GameMongoose) => {
  const {
    level, suns, win, zombiesKilled, plantsPlanted,
  } = game;
  return {
    level, suns, win, zombiesKilled, plantsPlanted,
  };
};

const Game = model<GameMongoose>('Game', gameSchema);

export default Game;
