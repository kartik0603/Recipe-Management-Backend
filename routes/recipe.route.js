const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const {
  createRecipe,
  getAllRecipes,
  getRecipeDetails,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
} = require("../controller/recipe.controller.js");
const protect = require("../middleware/auth.middleware.js");
const uploader = require("../middleware/upload_image.middleware.js");
const roleCheck = require("../middleware/roleCheck.middleware.js");

const recipeRouter = express.Router();


recipeRouter.use(protect);





recipeRouter.get("/all", roleCheck(["user", "admin"]), getAllRecipes);
recipeRouter.get("/details/:id", roleCheck(["user", "admin"]), getRecipeDetails);
recipeRouter.post("/create", roleCheck(["user", "admin"]), uploader.single("image"), createRecipe);
recipeRouter.patch("/update/:id", roleCheck(["user", "admin"]), uploader.single("image"), updateRecipe);
recipeRouter.delete("/delete/:id", roleCheck(["user", "admin"]), deleteRecipe);
recipeRouter.get("/search", roleCheck(["user", "admin"]), searchRecipes);

recipeRouter.put("/img-update/:id", roleCheck(["user", "admin"]), uploader.single("image"), updateRecipe);


module.exports = recipeRouter;
