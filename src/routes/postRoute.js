import { Router } from "express";
import postController from "../controllers/postController.js";

const postRoute = Router();

postRoute.post("/", postController.createPost);
postRoute.patch("/:postId/publish", postController.publishPost);

export default postRoute;
