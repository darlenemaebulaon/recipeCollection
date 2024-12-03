// Function to show notification
function showNotification(message, type = 'success') {

  // Get the container element where notifications will be displayed
  const container = document.getElementById('notification-container');

  // Create a new notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerText = message;

  // Append the notification to the container
  container.appendChild(notification);

  // Show the notification with animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  // Remove the notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      container.removeChild(notification);
    }, 300);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const recipeForm = document.getElementById('recipe-form');
  const recipeName = document.getElementById('recipe-name');
  const ingredients = document.getElementById('ingredients');
  const instructions = document.getElementById('instructions');
  const goToRecipeListButton = document.getElementById('go-to-recipe-list');

  // Handle form submission and send data to the backend
  recipeForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    // Create a new recipe object with form data
    const newRecipe = {
      title: recipeName.value,
      ingredients: ingredients.value,
      instructions: instructions.value,
    };
  
    try {
      // Send a POST request to add the new recipe to the backend
      const response = await fetch('http://localhost:3000/recipes/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      });
  
      // Parse the response from the server
      const data = await response.json();
      // Check if the recipe was successfully added
      if (data.code === "RECIPE-ADDED") {
        showNotification("Recipe added successfully!", "success");
        // Clear the form fields
        recipeName.value = '';
        ingredients.value = '';
        instructions.value = '';
      } else {
        showNotification("Error adding recipe!", "error");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      showNotification("Error adding recipe!", "error");
    }
  });
  
  // Navigate to the recipe list page when the button is clicked
  goToRecipeListButton.addEventListener('click', () => {
    window.location.href = '../HTML/allRecipe.html'; // Redirect to the allRecipe page
  });

});