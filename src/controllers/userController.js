import asyncHandler from "express-async-handler";
import userRepo from "../db/userRepo.js";

const userController = {
  signUp: asyncHandler(async (req, res) => {
    console.log("Sign up user");
    const { username, email, password } = req.body;
    const user = await userRepo.createUser({ username, email, password });
    console.log("Signed up user");
    return res.json({ message: "Signed up user", data: user });
  }),

  getAlluser: asyncHandler(async (req, res) => {
    console.log("Get All user from database");
    const { page, size } = req.query;
    const users = await userRepo.getAllUsersNotDeletedPaging(page, size);
    console.log("Found all user from database");
    return res.json({ message: "List of all users", data: users });
  }),
};

export default userController;
