import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import { MealModel } from "../../src/infrastructure/schemas/MealSchema";
import { TableModel } from "../../src/infrastructure/schemas/TableSchema";

dotenv.config({ path: "../../config.env" });

const DB =
  process.env.DATABASE?.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD ?? ""
  ) ?? "";

mongoose.connect(DB).then(() => {
  console.log("DB connection successful!");
});

const meals = JSON.parse(fs.readFileSync('meals.json', 'utf-8'));
const tables = JSON.parse(fs.readFileSync('tables.json', 'utf-8'));

const importDataToDB = async () => {
  try {
   await MealModel.create(meals);
   await TableModel.create(tables);
   console.log('Data successfuly loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
}

const deleteDataInDB = async () => {
  try {
   await MealModel.deleteMany();
   await TableModel.deleteMany();
   console.log('Data successfuly deleted!');
   
  } catch (error) {
    console.log(error);
  }
}

await deleteDataInDB();
await importDataToDB();