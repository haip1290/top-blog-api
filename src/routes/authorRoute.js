import { Router } from "express";
import authorController from "../controllers/authorController.js";
import postController from "../controllers/postController.js";

const authorRoute = Router();

authorRoute.post("/", authorController.createAuthor);
authorRoute.get("/:authorId/posts", postController.getPostsByAuthorId);

export default authorRoute;
