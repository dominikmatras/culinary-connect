import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { router as mealRouter } from "./src/presentation/routes/mealRouter";

dotenv.config({ path: "./config.env" });
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/meals", mealRouter);

export { app };
