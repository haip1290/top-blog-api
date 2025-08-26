import { Router } from "express";
import postController from "../controllers/postController.js";
import commentController from "../controllers/commentController.js";
import passport from "../auth/passport.js";
import hasRole from "../auth/authMiddleware.js";

const postRoute = Router();

postRoute.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  hasRole("AUTHOR"),
  postController.createPost
);
postRoute.get(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  hasRole("AUTHOR"),
  postController.getPostById
);
postRoute.patch("/:postId", postController.updatePost);
postRoute.patch("/:postId/publish", postController.publishPost);
postRoute.delete("/:postId", postController.deletePost);

postRoute.post("/:postId/comments", commentController.createComment);

export default postRoute;
