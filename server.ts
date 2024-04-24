import dotenv from "dotenv";
import { app } from "./app";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config({ path: "./config.env" });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const DB =
  process.env.DATABASE?.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD ?? ""
  ) ?? "";

mongoose.connect(DB).then(() => {
  console.log("DB connection successful!");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
