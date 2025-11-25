import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import dishRoutes from "./routes/dishRoutes.js";
import imagesRoutes from "./routes/imagesRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static images
app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.use("/api/dishes", dishRoutes);
app.use("/api/images", imagesRoutes);

app.get("/", (req, res) => {
  res.send("Dish Dashboard API is running");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
