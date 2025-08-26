import { Router } from "express";
import passport from "../auth/passport.js";
import jwt from "jsonwebtoken";
import { userToDto } from "../mapper/mapper.js";

const authRoute = Router();

authRoute.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error || !user) {
      return res
        .status(400)
        .json({ message: "authentication failed", data: user });
    }
    const payload = { id: user.id };
    const secret = process.env.SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    return res.json({
      message: "Authenticated successfully",
      data: { user: userToDto(user), token },
    });
  })(req, res, next);
});

export default authRoute;
