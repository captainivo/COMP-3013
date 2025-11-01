import { userModel } from "../../models/userModel";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById } from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';
import { User } from "../../interfaces/user";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email: string, password: string, done: (error: Error | null, user?: User | false, options?: { message: string }) => void) => {
    const user = getUserByEmailIdAndPassword(email, password);
    if (user) {
      return done(null, user);
    } else {
      // Check if user exists for more specific error
      const foundUser = userModel.findOne(email);
      if (!foundUser) {
        return done(null, false, { message: "No user found with that email." });
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    }
  }
);


passport.serializeUser(function (user: any, done: (err: any, id?: any) => void) {
  done(null, user.id);
});


passport.deserializeUser(function (id: any, done: (err: any, user?: any) => void) {
  const user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done(new Error("User not found"), null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
