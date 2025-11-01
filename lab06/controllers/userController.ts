import {userModel} from "../models/userModel";


import { User } from "../interfaces/user";

const getUserByEmailIdAndPassword = (email: string, password: string): User | null => {
  try {
    const user = userModel.findOne(email);
    if (user && isUserValid(user, password)) {
      return user;
    }
    return null;
  } catch {
    return null;
  }
};

const getUserById = (id: number): User | null => {
  try {
    const user = userModel.findById(id);
    return user || null;
  } catch {
    return null;
  }
};

function isUserValid(user: User, password: string): boolean {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};
