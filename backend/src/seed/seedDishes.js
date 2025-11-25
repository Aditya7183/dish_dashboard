import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { Dish } from "../models/Dish.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  try {
    await connectDB();

    const dataPath = path.join(__dirname, "dishes.json");
    const dishes = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    await Dish.deleteMany({});
    await Dish.insertMany(dishes);

    console.log("Dishes seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
