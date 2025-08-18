import { param } from "express-validator";
import validateRequest from "./validator.js";
import { generalMsg } from "./validationMsg.js";

const validatePostId = [
  param("postId")
    .exists()
    .withMessage(`Post ID ${generalMsg.isRequire}`)
    .isInt({ min: 1 })
    .withMessage(`Post ${generalMsg.isPositiveInt}`),
  validateRequest,
];

export { validatePostId };
