import { uuid } from 'uuidv4';
import mongoose, { Schema, model } from 'mongoose';
import { hash as _hash, compare } from 'bcrypt';

const saltRounds = 10;

export interface UserMongoose extends mongoose.Document {
  password: string;
  login: string;
  id: string;
}

export interface UserFromInput {
  password: UserMongoose['password'];
  login: UserMongoose['login'];
  id: UserMongoose['id'];
}

export type ParamsObject = {[dynamic: string]: string | number | boolean};

export const userSchema = new Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid,
    },
  },
  { versionKey: false },
);

userSchema.pre('save', async function preSave() {
  const user: UserMongoose = this as UserMongoose;
  await _hash(user.password, saltRounds).then((hash) => {
    user.password = hash;
  });
});

userSchema.methods.comparePassword = async function comparePw(receivedPassword: string) {
  const compareRes = await compare(receivedPassword, this.password);
  return compareRes;
};

userSchema.statics.toResponse = (user: UserMongoose) => {
  const { id, login } = user;
  return { id, login };
};

const User = model<UserMongoose>('User', userSchema);

export default User;
