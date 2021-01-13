import mongoose, { Schema, model } from 'mongoose';
import { uuid } from 'uuidv4';

export interface GameMongoose extends mongoose.Document {
  id: string;
  user: string;
  level: number;
  win: boolean;
  zombiesKilled: number;
  plantsPlanted: number;
}

export interface GameFromInput {
  id: GameMongoose['id'];
  user: GameMongoose['user'];
  level: GameMongoose['level'];
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
    win: Boolean,
    zombiesKilled: Number,
    plantsPlanted: Number,
  },
  { versionKey: false },
);

gameSchema.statics.toResponse = (game: GameMongoose) => {
  const {
    level, win, zombiesKilled, plantsPlanted,
  } = game;
  return {
    level, win, zombiesKilled, plantsPlanted,
  };
};

const Game = model<GameMongoose>('Game', gameSchema);

export default Game;
