import { Router } from "express";
import userController from "../controllers/userController.js";

const userRoute = Router();

userRoute.get("/", userController.getAlluser);
userRoute.post("/", userController.signUp);

export default userRoute;
