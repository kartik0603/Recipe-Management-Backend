const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    image: {
      data: Buffer, // Binary data OF image
      contentType: String, // MIME type image
    },
    instructions: { type: String, required: true },
    cuisineType: {
      type: String,
      enum: [
        "Gujarati",
        "Punjabi",
        "South Indian",
        "North Indian",
        "Chinese",
        "Mexican",
        "American",
        "Italian",
      ],
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;


