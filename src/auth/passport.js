import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import userRepo from "../db/userRepo.js";
import passportJWT from "passport-jwt";
import { userToDto } from "../mapper/mapper.js";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      console.log(`Authenticating user ${email}, ${password}`);
      const user = await userRepo.getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) {
        return done(null, false, { message: "Incorrect password." });
      }
      console.log("Authenticate successfully ");
      const safeUser = userToDto(user);
      return done(null, safeUser);
    } catch (error) {
      return done(error);
    }
  }
);

const JWTStragety = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const jwtStrategy = new JWTStragety(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await userRepo.getUserById(jwtPayload.id);
      const safeUser = userToDto(user);
      if (user) {
        return done(null, safeUser);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error);
    }
  }
);

passport.use(localStrategy);
passport.use(jwtStrategy);

export default passport;
