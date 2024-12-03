// Create the HTML content for the navbar dynamically
document.getElementById("navbar").innerHTML = `
    <a href="../HTML/home.html" class="logo">Recipe Collection</a>
    <ul>
        <li><a href="../HTML/home.html">Home</a></li>
        <li><a href="../HTML/addRecipe.html">Add Recipe</a></li>
        <li><a href="../HTML/allRecipe.html">All Recipes</a></li>
            <button id="theme-toggle" class="theme-toggle">
                <span class="mode-icon">🌙</span> Dark Mode
            </button>
    </ul>
    
`;

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");

    // Handle theme toggle
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            themeToggle.innerHTML = document.body.classList.contains("dark-mode")
                ? '<span class="mode-icon">🌞</span> Go Light Mode'
                : '<span class="mode-icon">🌙</span> Go Dark Mode';
        });
    }
});