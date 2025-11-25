import express from "express";
import { Dish } from "../models/Dish.js";

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find().sort({ dishId: 1 });
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST new dish
router.post("/", async (req, res) => {
  try {
    const { dishId, dishName, imageFileName, isPublished } = req.body;

    const imageUrl = `${req.protocol}://${req.get("host")}/public/images/${encodeURIComponent(imageFileName)}`;

    const newDish = new Dish({
      dishId,
      dishName,
      imageUrl,
      isPublished
    });

    await newDish.save();
    res.status(201).json(newDish);
  } catch (err) {
    console.error("Error creating dish:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// TOGGLE publish
router.patch("/:dishId/toggle", async (req, res) => {
  try {
    const dish = await Dish.findOne({ dishId: Number(req.params.dishId) });
    if (!dish) return res.status(404).json({ message: "Dish not found" });

    dish.isPublished = !dish.isPublished;
    await dish.save();

    res.json(dish);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
