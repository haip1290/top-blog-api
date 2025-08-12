import { body } from "express-validator";
import validateRequest from "./validator.js";

const isRequireMsg = "is required";
const usernameLengthMsg = "must be in range 3-20 characters";
const passwordLengthMsg = "must be in range 6-20 characters";
const validEmailMsg = "Please enter a valid email address";
const isAlphanumericMSg = "must be alphabet letters and numbers";

const validateUserSignUp = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username " + isRequireMsg)
    .isLength({ min: 3, max: 10 })
    .withMessage("Username " + usernameLengthMsg)
    .isAlphanumeric()
    .withMessage("USername " + isAlphanumericMSg),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email " + isRequireMsg)
    .isEmail()
    .withMessage(validEmailMsg),
  body("password")
    .notEmpty()
    .withMessage("Password " + isRequireMsg)
    .isLength({ min: 6, max: 20 })
    .withMessage("Password " + passwordLengthMsg),
  validateRequest,
];

export { validateUserSignUp };
