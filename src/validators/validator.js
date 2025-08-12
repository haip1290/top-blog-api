import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  const errorsMsg = errors.array().map((error) => error.msg);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Error", errors: errorsMsg });
  }
  next();
};

export default validateRequest;
