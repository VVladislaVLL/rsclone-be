import { UserFromInput, ParamsObject } from './user.model';

const User = require('./user.model').default;

const getUsers = async () => User.find({});

const createUser = async (user: UserFromInput) => User.create(user);

const getOneUserByParams = (
  paramsObj: ParamsObject,
) => User.findOne(paramsObj);

const updateUser = async (user: UserFromInput) => {
  const userBody = { ...user };
  delete userBody.id;
  const updatedUser = await User.updateOne({ _id: user.id }, userBody);
  return updatedUser;
};

const deleteUser = async (id: string) => (await User.deleteOne({ _id: id })).ok;

export {
  getUsers,
  createUser,
  getOneUserByParams,
  updateUser,
  deleteUser,
};
