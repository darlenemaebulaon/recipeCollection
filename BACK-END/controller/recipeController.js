const Recipe = require("../model/recipeModel.js");

// Add a new recipe
module.exports.addRecipe = async (req, res) => {
    try {
        // Extract recipe data from the request body
        const { title, ingredients, instructions } = req.body;
        const newRecipe = { title, ingredients, instructions };

        const result = await Recipe.createRecipe(newRecipe);

        res.status(201).json({
            code: "RECIPE-ADDED",
            message: "Recipe successfully added.",
            result: result,
        });
    } catch (error) {
        console.error("Error adding recipe:", error); // Log the error
        res.status(500).json({
            code: "SERVER-ERROR",
            message: "Error adding the recipe.",
            error: error.message,
        });
    }
};


// Get all recipes
module.exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.getAllRecipes();
        res.status(200).json({
            code: "ALL-RECIPES-RESULT",
            message: "List of all recipes.",
            result: recipes
        });
    } catch (error) {
        res.status(500).json({
            code: "SERVER-ERROR",
            message: "Error fetching recipes.",
            error: error.message
        });
    }
};

// Get a specific recipe by ID
module.exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.getRecipeById(req.params.id);
        if (recipe) {
            res.status(200).json({
                code: "RECIPE-FOUND",
                message: "Recipe found.",
                result: recipe
            });
        } else {
            res.status(404).json({
                code: "RECIPE-NOT-FOUND",
                message: "Recipe not found."
            });
        }
    } catch (error) {
        res.status(500).json({
            code: "SERVER-ERROR",
            message: "Error fetching the recipe.",
            error: error.message
        });
    }
};

// Update an existing recipe by ID
module.exports.updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = req.body;
        const result = await Recipe.updateRecipe(req.params.id, updatedRecipe);
        if (result.affectedRows > 0) {
            res.status(200).json({
                code: "RECIPE-UPDATED",
                message: "Recipe updated successfully."
            });
        } else {
            res.status(404).json({
                code: "RECIPE-NOT-FOUND",
                message: "Recipe not found."
            });
        }
    } catch (error) {
        res.status(500).json({
            code: "SERVER-ERROR",
            message: "Error updating the recipe.",
            error: error.message
        });
    }
};

// Delete a recipe by ID
module.exports.deleteRecipe = async (req, res) => {
    try {
        const result = await Recipe.deleteRecipe(req.params.id);
        if (result.affectedRows > 0) {
            res.status(200).json({
                code: "RECIPE-DELETED",
                message: "Recipe deleted successfully."
            });
        } else {
            res.status(404).json({
                code: "RECIPE-NOT-FOUND",
                message: "Recipe not found."
            });
        }
    } catch (error) {
        res.status(500).json({
            code: "SERVER-ERROR",
            message: "Error deleting the recipe.",
            error: error.message
        });
    }
};