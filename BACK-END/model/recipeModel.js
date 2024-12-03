const db = require("../db/connection.js");

// Create a new recipe
module.exports.createRecipe = async (recipeData) => {
    const { title, ingredients, instructions } = recipeData;
    const query = `
        INSERT INTO recipes (title, ingredients, instructions)
        VALUES (?, ?, ?)`;
    const [result] = await db.execute(query, [title, ingredients, instructions]);
    return result;
};

// Get all recipes
module.exports.getAllRecipes = async () => {
    const [rows] = await db.execute("SELECT * FROM recipes");
    return rows;
};

// Get a recipe by its ID
module.exports.getRecipeById = async (id) => {
    const [rows] = await db.execute("SELECT * FROM recipes WHERE id = ?", [id]);
    return rows[0];
};

// Update an existing recipe by its ID
module.exports.updateRecipe = async (id, recipeData) => {
    const { title, ingredients, instructions} = recipeData;
    const query = `
        UPDATE recipes
        SET title = ?, ingredients = ?, instructions = ?
        WHERE id = ?`;
    const [result] = await db.execute(query, [title, ingredients, instructions, id]);
    return result;
};

// Delete a recipe by its ID
module.exports.deleteRecipe = async (id) => {
    const [result] = await db.execute("DELETE FROM recipes WHERE id = ?", [id]);
    return result;
};