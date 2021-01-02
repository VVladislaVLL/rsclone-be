import {
  getGames as _getGames,
  createGame as _createGame,
  getOneGameByParams as _getOneGameByParams,
  getAllGamesByParams as _getAllGamesByParams,
  updateGame as _updateGame,
  deleteGame as _deleteGame,
} from './game.db.repository';
import { ParamsObject, GameFromInput } from './game.model';

const getGames = () => _getGames();

const createGame = (game: GameFromInput) => _createGame(game);

const getOneGameById = (id: string) => _getOneGameByParams({ _id: id });

const getOneGameByParams = async (paramsObj: ParamsObject) => _getOneGameByParams(paramsObj);

const getAllGamesByParams = async (paramsObj: ParamsObject) => _getAllGamesByParams(paramsObj);

const updateGame = (game: GameFromInput) => _updateGame(game);

const deleteGame = async (id: string) => {
  const result = await _deleteGame(id);
  return result;
};

export default {
  getGames,
  updateGame,
  createGame,
  getOneGameById,
  deleteGame,
  getOneGameByParams,
  getAllGamesByParams,
};
