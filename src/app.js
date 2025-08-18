import "dotenv/config";
import express from "express";
import indexRoute from "./routes/indexRoute.js";
import userRoute from "./routes/userRoute.js";
import authorRoute from "./routes/authorRoute.js";
import postRoute from "./routes/postRoute.js";

const app = express();

app.use(express.json());

app.use("/users", userRoute);
app.use("/authors", authorRoute);
app.use("/posts", postRoute);
app.use("/", indexRoute);

app.use((error, req, res, next) => {
  console.log("Something went wrong ", error);
  res.status(500).json({ message: error.message, errors: [error.message] });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
