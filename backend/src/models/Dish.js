import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  dishId: { type: Number, unique: true, required: true },
  dishName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isPublished: { type: Boolean, default: false }
});

export const Dish = mongoose.model("Dish", dishSchema);
