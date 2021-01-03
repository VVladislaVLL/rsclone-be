import {
  getUsers as _getUsers,
  createUser as _createUser,
  getOneUserByParams as _getOneUserByParams,
  updateUser as _updateUser,
  deleteUser as _deleteUser,
} from './user.db.repository';
import { ParamsObject, UserFromInput } from './user.model';

const getUsers = () => _getUsers();

const createUser = (user: UserFromInput) => _createUser(user);

const getOneUserById = (id: string) => _getOneUserByParams({ _id: id });

const getOneUserByParams = async (paramsObj: ParamsObject) => _getOneUserByParams(paramsObj);

const updateUser = (user: UserFromInput) => _updateUser(user);

const deleteUser = async (id: string) => {
  const result = await _deleteUser(id);
  return result;
};

export default {
  getUsers,
  updateUser,
  createUser,
  getOneUserById,
  deleteUser,
  getOneUserByParams,
};
