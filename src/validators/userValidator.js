import { body, param } from "express-validator";
import validateRequest from "./validator.js";

import {
  generalMsg,
  usernameMsg,
  emailMsg,
  passwordMsg,
} from "./validationMsg.js";

const validateUserSignUp = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username " + generalMsg.isRequire)
    .isLength({ min: 3, max: 10 })
    .withMessage("Username " + usernameMsg.length)
    .isAlphanumeric()
    .withMessage("USername " + generalMsg.isAlphanumeric),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email ${generalMsg.isRequire}`)
    .isEmail()
    .withMessage(emailMsg.valid),
  body("password")
    .notEmpty()
    .withMessage(`Password ${generalMsg.isRequire}`)
    .isLength({ min: 6, max: 20 })
    .withMessage(`Password ${passwordMsg.length}`),
  validateRequest,
];

const validateUserId = [
  param("authorId")
    .exists()
    .withMessage(`Author ID  ${generalMsg.isRequire}`)
    .isInt({ min: 1 })
    .withMessage(`Author ID  ${generalMsg.isPositiveInt}`),
  validateRequest,
];

export { validateUserSignUp, validateUserId };
