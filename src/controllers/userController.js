import asyncHandler from "express-async-handler";
import userRepo from "../db/userRepo.js";
import bcrypt from "bcrypt";
import validateUserSignUp from "../validators/userValidator.js";

const userToDTO = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
});

const userController = {
  signUp: [
    validateUserSignUp,
    asyncHandler(async (req, res) => {
      console.log("Sign up user");
      const { username, email, password } = req.body;
      const saltRounds = Number(process.env.SALT);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await userRepo.createUser({
        username,
        email,
        password: hashedPassword,
      });
      console.log("Signed up user");
      return res
        .status(201)
        .json({ message: "Signed up user", data: userToDTO(user) });
    }),
  ],

  getAlluser: asyncHandler(async (req, res) => {
    console.log("Get All user from database");
    const { page, size } = req.query;
    const users = await userRepo.getAllUsersNotDeletedPaging(page, size);
    const usersDTO = users.map((user) => userToDTO(user));
    console.log("Found all user from database");
    return res.json({ message: "List of all users", data: usersDTO });
  }),
};

export default userController;
