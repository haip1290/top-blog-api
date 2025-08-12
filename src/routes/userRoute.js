import { Router } from "express";
import userController from "../controllers/userController.js";

const userRoute = Router();

userRoute.get("/", userController.getAlluser);
userRoute.post("/", userController.signUp);
userRoute.delete("/:id", userController.deleteUser);

export default userRoute;
