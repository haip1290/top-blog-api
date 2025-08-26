import asyncHandler from "express-async-handler";
import * as userValidator from "../validators/userValidator.js";
import bcrypt from "bcrypt";
import userRepo from "../db/userRepo.js";
import { userToDto } from "../mapper/mapper.js";

const authorController = {
  createAuthor: [
    userValidator.validateUserSignUp,
    asyncHandler(async (req, res) => {
      console.log("Sign up author");
      const { username, email, password } = req.body;
      const saltRounds = Number(process.env.SALT);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await userRepo.createAuthor({
        username,
        email,
        password: hashedPassword,
      });
      console.log("Signed up author");
      return res
        .status(201)
        .json({ message: "Signed up author", data: userToDto(user) });
    }),
  ],
};

export default authorController;
