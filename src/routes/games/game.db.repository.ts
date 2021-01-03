import { GameFromInput, ParamsObject } from './game.model';

const Game = require('./game.model').default;

const getGames = async () => Game.find({});

const createGame = async (game: GameFromInput) => Game.create(game);

const getOneGameByParams = (
  paramsObj: ParamsObject,
) => Game.findOne(paramsObj);

const getAllGamesByParams = (
  paramsObj: ParamsObject,
) => Game.find(paramsObj);

const updateGame = async (game: GameFromInput) => {
  const gameBody = { ...game };
  delete gameBody.id;
  const updatedGame = await Game.updateOne({ _id: game.id }, gameBody);
  return updatedGame;
};

const deleteGame = async (id: string) => (await Game.deleteOne({ _id: id })).ok;

export {
  getGames,
  createGame,
  getOneGameByParams,
  getAllGamesByParams,
  updateGame,
  deleteGame,
};
