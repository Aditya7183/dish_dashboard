import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, "..", "..", "public/images");

router.get("/", async (req, res) => {
  try {
    const files = await fs.promises.readdir(imagesDir);
    const host = `${req.protocol}://${req.get("host")}`;

    const images = files.map((file) => ({
      filename: file,
      url: `${host}/public/images/${encodeURIComponent(file)}`
    }));

    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

export default router;
