import { app } from "./app";
import mongoose from "mongoose";

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
