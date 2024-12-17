const Recipe = require("../model/recipe.schema.js");

// Create recipe
const createRecipe = async (req, res) => {
  try {
    const { title, ingredients,  instructions, cuisineType,  image } = req.body;


    if (!title || !ingredients || ! instructions || !cuisineType || ! image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const recipeData = {
      title,
      ingredients: ingredients.split(","), 
      instructions,
      cuisineType,
      image: req.file ? req.file.path : null,
      createdBy: req.user.id, 
    };


    const recipe = await Recipe.create(recipeData);

   
    return res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    res.status(400).json({ message: "Error creating recipe", error: error.message });
  }
};

// all recipes
const getAllRecipes = async (req, res) => {
  try {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const recipes = await Recipe.find()
      .populate("createdBy", "username email") 
      .skip((page - 1) * limit)
      .limit(limit);

    
    return res.status(200).json({ recipes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    
    const recipe = await Recipe.findOne({ _id: id, createdBy: req.user.id });
    if (!recipe) {
      return res.status(403).json({ message: "You are not authorized to update this recipe" });
    }

    const allowedUpdates = ["title", "ingredients", "instructions", "cuisineType", "image"];
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((key) => allowedUpdates.includes(key));
    if (!isValidOperation) {
      return res.status(400).json({
        message: "Invalid update fields. Only allowed fields can be updated.",
      });
    }

    
    if (updates.length === 0 && !req.file) {
      return res.status(400).json({ message: "No valid fields provided for update." });
    }

    
    Object.assign(recipe, req.body);

    if (req.file) {
      recipe.image = req.file.path; 
    }

    
    await recipe.save();

    
    return res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (error) {
    return res.status(500).json({ message: "Error updating recipe", error: error.message });
  }
};

// Get recipe  ID
const getRecipeDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id).populate("createdBy", "username email");

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

  
    res.status(200).json({ recipe });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching recipe details", error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    
    const recipe = await Recipe.findOneAndDelete({
      _id: id,
      createdBy: req.user.id,
    });
    if (!recipe) {
      return res.status(403).json({ message: "You are not authorized to delete this recipe." });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error: error.message });
  }
};

const searchRecipes = async (req, res) => {
  const { cuisineType } = req.query;

  try {
    if (!cuisineType) {
      return res.status(400).json({
        message: "Please provide a cuisine type to search for recipes.",
      });
    }

    
    const recipes = await Recipe.find({
      cuisineType: { $regex: new RegExp(cuisineType, "i") },
    }).populate("createdBy", "username email");

    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found for the specified cuisine type." });
    }

    res.status(200).json({ recipes });
  } catch (error) {
    res.status(500).json({ message: "Error searching recipes", error: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
  getRecipeDetails,
};
