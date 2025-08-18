import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsMsg = errors.array().map((error) => error.msg);
    return res.status(400).json({ message: "Error", errors: errorsMsg });
  }
  next();
};

export default validateRequest;
