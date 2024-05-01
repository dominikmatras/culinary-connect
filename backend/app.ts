import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors';
import { AppError } from "./utils/AppError";
import { router as mealRouter } from "./src/presentation/routes/mealRouter";
import { router as userRouter } from "./src/presentation/routes/userRouter";
import { globalErrorHandler } from "./src/presentation/middleware/errorHandler";

dotenv.config({ path: "./config.env" });
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors())

app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(err);
});

app.use(globalErrorHandler);

export { app };
