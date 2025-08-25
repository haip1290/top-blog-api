import { Router } from "express";
import userController from "../controllers/userController.js";
import passport from "../authentication/passport.js";

const userRoute = Router();

userRoute.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.getAlluser
);
userRoute.post("/", userController.signUp);
userRoute.delete("/:userId", userController.deleteUser);

export default userRoute;
