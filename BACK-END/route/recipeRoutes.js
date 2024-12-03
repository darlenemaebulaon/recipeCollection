const express = require("express");
const recipeController = require("../controller/recipeController.js");
const router = express.Router();

// Create Recipe
router.post("/add", recipeController.addRecipe);

// Get All Recipes
router.get("/all", recipeController.getAllRecipes);

// Get Recipe by ID
router.get("/:id", recipeController.getRecipeById);

// Update Recipe
router.put("/update/:id", recipeController.updateRecipe);

// Delete Recipe
router.delete("/delete/:id", recipeController.deleteRecipe);

module.exports = router;