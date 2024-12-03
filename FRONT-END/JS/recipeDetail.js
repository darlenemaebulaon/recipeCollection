document.addEventListener("DOMContentLoaded", async () => {
  const themeToggle = document.getElementById("theme-toggle");
  const recipeId = new URLSearchParams(window.location.search).get("id");
  const recipeTitle = document.getElementById("recipe-title");
  const recipeIngredients = document.getElementById("recipe-ingredients");
  const recipeInstructions = document.getElementById("recipe-instructions");
  const recipesListBtn = document.getElementById("recipes-list-btn");

  // Show loading state
  const showLoading = () => {
    recipeTitle.textContent = "Loading...";
    recipeIngredients.textContent = "Loading...";
    recipeInstructions.textContent = "Loading...";
  };

  // Hide loading state
  const hideLoading = () => {
    recipeTitle.textContent = "";
    recipeIngredients.textContent = "";
    recipeInstructions.textContent = "";
  };

  // Fetch recipe by ID
  const fetchRecipe = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/recipes/${id}`);
      
      // If the recipe is not found (404 error), handle it as a specific case
      if (response.status === 404) {
        throw new Error("Recipe not found! It may have been deleted.");
      }
  
      // If the response is not ok (other errors), throw a generic error
      if (!response.ok) {
        throw new Error("Failed to fetch recipe.");
      }
  
      const data = await response.json();
      return data.result;
    } catch (error) {
      // Instead of logging to the console, you can just return null
      return null;  // Return null silently
    }
  };

  // Format text helper (for ingredients and instructions)
  const formatText = (text, isInstruction = false) => {
    const lines = text.split("\n").map((line) => (line.trim() ? line : "&nbsp;"));
    if (isInstruction) {
      return lines.map((line, index) => `${index + 1}. ${line}`).join("<br>");
    } else {
      return lines.join("<br>");
    }
  };

  // Navigate back to recipe list
  recipesListBtn.addEventListener("click", () => {
    window.location.href = "../HTML/allRecipe.html";
  });

  // Ensure recipeId exists in URL parameters
  if (!recipeId) {
    alert("No recipe ID provided!");
    window.location.href = "../HTML/allRecipe.html"; // Redirect to recipe list
    return; // Exit if no recipe ID is found
  }

  showLoading(); // Display loading state

  const recipe = await fetchRecipe(recipeId);
  hideLoading(); // Hide loading state after fetch completes

  if (recipe) {
    recipeTitle.textContent = recipe.title;
    recipeIngredients.innerHTML = formatText(recipe.ingredients);
    recipeInstructions.innerHTML = formatText(recipe.instructions, true);
  } else {
    alert("Recipe not found! It may have been deleted.");
    window.location.href = "../HTML/allRecipe.html"; // Redirect to recipe list if not found
  }
});
