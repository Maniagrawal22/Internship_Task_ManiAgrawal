const recipes = [
  {
    title: "Pancakes",
    ingredients: ["flour", "milk", "eggs"],
    type: "breakfast",
  },
  {
    title: "Sandwich",
    ingredients: ["bread","potato","onion", "spices"],
    type: "lunch",
  },
  {
    title: "Spaghetti",
    ingredients: ["pasta", "cheese", "tomato"],
    type: "dinner",
  },
  {
    title: "Pizza",
    ingredients: ["pizza bread", "cheese", "spices"],
    type: "dinner",
  }
];

// Function to Render Recipes
function renderRecipes(recipesToDisplay) {
  const recipesContainer = document.getElementById("recipesContainer");
  recipesContainer.innerHTML = "";

  if (recipesToDisplay.length === 0) {
    recipesContainer.innerHTML = "<p class='text-center'>No recipes found.</p>";
    return;
  }

  recipesToDisplay.forEach((recipe) => {
    const recipeCard = `
      <div class="col-md-4">
        <div class="card recipe-card">
          <div class="card-body">
            <h5 class="card-title recipe-title">${recipe.title}</h5>
            <p class="card-text">Ingredients: ${recipe.ingredients.join(", ")}</p>
            <p class="card-text"><small class="text-muted">Type: ${recipe.type}</small></p>
          </div>
        </div>
      </div>`;
    recipesContainer.innerHTML += recipeCard;
  });
}

// Search Functionality
document.getElementById("searchButton").addEventListener("click", () => {
  const ingredientInput = document.getElementById("ingredientInput").value.toLowerCase();
  const selectedType = document.getElementById("recipeType").value;

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesIngredients = recipe.ingredients.some((ingredient) =>
      ingredient.includes(ingredientInput)
    );
    const matchesType = selectedType === "all" || recipe.type === selectedType;

    return matchesIngredients && matchesType;
  });

  renderRecipes(filteredRecipes);
});

// Initialize with All Recipes
renderRecipes(recipes);