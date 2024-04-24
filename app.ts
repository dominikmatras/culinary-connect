import express from "express";
import { router as mealRouter } from "./src/presentation/routes/mealRouter";

const app = express();

app.use(express.json());

app.use("/api/v1/meals", mealRouter);

export { app };
