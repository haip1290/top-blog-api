import { Router } from "express";

const indexRoute = Router();

indexRoute.use("/", (req, res) => {
  res.json({ message: "GET HTTP requrest" });
});

export default indexRoute;
