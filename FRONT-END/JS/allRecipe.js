document.addEventListener("DOMContentLoaded", async () => {
  // Get elements from the DOM  
  const themeToggle = document.getElementById('theme-toggle');
    const recipeList = document.getElementById('recipe-list');
    const goToAddRecipeButton = document.getElementById('go-to-add-recipe');
  
    // Fetch recipes from the backend
    const fetchRecipes = async () => {
      try {
        // Send GET request to fetch all recipes
        const response = await fetch('http://localhost:3000/recipes/all');
        const data = await response.json();
        // Return the recipes or an empty array if there's an error
        return data.result || [];
      } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
      }
    };
  
    // Render recipe list
    const renderRecipeList = async () => {
      const recipes = await fetchRecipes();
      recipeList.innerHTML = '';
      recipes.forEach((recipe) => {
        // Create a new list item for each recipe
        const li = document.createElement('li');
        li.classList.add('recipe-item');
        li.innerHTML = `
          <a href="../HTML/recipeDetail.html?id=${recipe.id}">
            <h3>${recipe.title}</h3>
            <button class="edit-btn" data-id="${recipe.id}">Edit</button>
            <button class="delete-btn" data-id="${recipe.id}">Delete</button>
          </a>
        `;
        // Append the new list item to the recipe list
        recipeList.appendChild(li);

        // Event listener for the Edit button
        li.querySelector(".edit-btn").addEventListener("click", () => {
          const updatedData = {
            title: prompt("Enter new title", recipe.title),
            ingredients: prompt("Enter new ingredients (separated by newlines)", recipe.ingredients),
            instructions: prompt("Enter new instructions (separated by newlines)", recipe.instructions),
          };
          updateRecipe(recipe.id, updatedData); // Call function to update the recipe
        });
  
        // Event listener for the Delete button
        li.querySelector(".delete-btn").addEventListener("click", () => {
          deleteRecipe(recipe.id); // Call function to delete the recipe
        });
      });
    };

    // Update recipe
    const updateRecipe = async (id, updatedData) => {
      try {
        const response = await fetch(`http://localhost:3000/recipes/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        const data = await response.json();
        // Check if the update was successful
        if (data.code === "RECIPE-UPDATED") {
          alert("Recipe updated successfully!");
          renderRecipeList(); // Refresh list
        } else {
          alert("Error updating recipe!");
        }
      } catch (error) {
        console.error("Error updating recipe:", error);
        alert("Error updating recipe!");
      }
    };
    

    // Delete recipe
    const deleteRecipe = async (id) => {
      if (confirm("Are you sure you want to delete this recipe?")) {
        try {
          const response = await fetch(`http://localhost:3000/recipes/delete/${id}`, {
            method: "DELETE",
          });
          const data = await response.json();
          // Check if the deletion was successful
          if (data.code === "RECIPE-DELETED") {
            alert("Recipe deleted successfully!");
            renderRecipeList(); // Refresh list
          } else {
            alert("Error deleting recipe!");
          }
        } catch (error) {
          console.error("Error deleting recipe:", error);
          alert("Error deleting recipe!");
        }
      }
    };

    // Navigate to the Add Recipe page when the button is clicked
    goToAddRecipeButton.addEventListener('click', () => {
      window.location.href = '../HTML/addRecipe.html';
    });
  
    renderRecipeList();
  });