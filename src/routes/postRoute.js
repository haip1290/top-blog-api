import { Router } from "express";
import postController from "../controllers/postController";
const postRoute = Router;

postRoute.post("/", postController.createPost);

export default postRoute;
