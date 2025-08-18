import { query } from "express-validator";
import validateRequest from "./validator.js";
import { generalMsg } from "./validationMsg.js";

const validatePagination = [
  query("page")
    .exists()
    .withMessage(`Page ${generalMsg.isRequire}`)
    .isInt({ min: 1 })
    .withMessage(`Page ${generalMsg.isPositiveInt}`),
  query("size")
    .exists()
    .withMessage(`Size ${generalMsg.isRequire}`)
    .isInt({ min: 1 })
    .withMessage(`Size ${generalMsg.isPositiveInt}`),
  validateRequest,
];

export { validatePagination };
