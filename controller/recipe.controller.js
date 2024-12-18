const Recipe = require("../model/recipe.schema.js");
const mongoose = require("mongoose");

// Create recipe
const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, cuisineType } = req.body;

    if (!title || !ingredients || !instructions || !cuisineType) {
      return res.status(400).json({ message: "All fields are required except image" });
    }

    

    const recipeData = {
      title,
      ingredients: ingredients.split(",").map((item) => item.trim()), 
      instructions,
      cuisineType,
   
      createdBy: req.user.id,
    };

    if (req.file) {
      recipeData.image = {
        data: req.file.buffer, // Store image  BInary data
        contentType: req.file.mimetype, // Store MIME type
      };
    }

    const recipe = await Recipe.create(recipeData);

    return res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    res.status(500).json({ message: "Error creating recipe", error: error.message });
  }
};


// all recipes
const getAllRecipes = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1); 
    const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1); 

    const totalRecipes = await Recipe.countDocuments(); 
    const recipes = await Recipe.find()
      .populate("createdBy", "username email") 
      .sort({ createdAt: -1 }) 
      .skip((page - 1) * limit) 
      .limit(limit); 

    return res.status(200).json({
      recipes,
      currentPage: page,
      totalPages: Math.ceil(totalRecipes / limit),
      totalRecipes,
    });
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

 
    if (req.file) {
      recipe.image = {
        data: req.file.buffer, 
        contentType: req.file.mimetype, 
      };
    }

    
    for (const key of updates) {
      recipe[key] = req.body[key];
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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid recipe ID" });
  }

  try {
    const recipe = await Recipe.findById(id).populate("createdBy", "username email");

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const recipeWithImage = {
      ...recipe._doc,
      image: recipe.image
        ? `data:${recipe.image.contentType};base64,${recipe.image.data.toString("base64")}`
        : null,
    };

    res.status(200).json({ recipe: recipeWithImage });
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
