import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { AppError } from "./utils/AppError";
import { router as mealRouter } from "./src/presentation/routes/mealRouter";
import { globalErrorHandler } from "./src/presentation/middleware/errorHandler";

dotenv.config({ path: "./config.env" });
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/meals", mealRouter);

app.all("*", (req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(err);
});

app.use(globalErrorHandler);

export { app };
