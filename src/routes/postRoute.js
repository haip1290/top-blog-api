import { Router } from "express";
import postController from "../controllers/postController.js";

const postRoute = Router();

postRoute.post("/", postController.createPost);
postRoute.get("/:postId", postController.getPostById);
postRoute.patch("/:postId", postController.updatePost);
postRoute.patch("/:postId/publish", postController.publishPost);
postRoute.delete("/:postId", postController.deletePost);

export default postRoute;
