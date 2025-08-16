import { Router } from "express";
import authorController from "../controllers/authorController.js";
import postController from "../controllers/postController.js";

const authorRoute = Router();
authorRoute.post("/", authorController.createAuthor);
authorRoute.get("/:authorId/posts", postController.getPostByAuthorId);
authorRoute.post("/:authorId/posts", postController.createPost);

export default authorRoute;
