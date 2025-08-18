import asyncHandler from "express-async-handler";
import userRepo from "../db/userRepo.js";
import bcrypt from "bcrypt";
import { userToDTO } from "../mapper/mapper.js";
import { validateUserSignUp } from "../validators/userValidator.js";
import { validatePagination } from "../validators/paginationValidator.js";

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

  getAlluser: [
    validatePagination,
    asyncHandler(async (req, res) => {
      console.log("Get All user from database");
      const { page, size } = req.query;
      const { users, totalCount } = await userRepo.getAllActiveUsersPaging(
        Number(page),
        Number(size)
      );
      const usersDTO = users.map((user) => userToDTO(user));
      console.log("Found all user from database");
      return res.json({
        message: "List of all users",
        data: { users: usersDTO, totalCount },
      });
    }),
  ],

  deleteUser: asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res
        .status(400)
        .json({ message: "Error", error: "Invalid user ID", data: id });
    console.log("Deleting user ", id);
    const deletedUser = await userRepo.deleteUser(id);
    console.log("Deleted user ", deletedUser.id);
    return res.json({ message: "Deleted User", data: userToDTO(deletedUser) });
  }),
};

export default userController;
