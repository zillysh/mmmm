

let items = [];

// Number of Results
  const updateResultsText = (count) => {
  const resultsText = document.getElementById('results-text');
  resultsText.textContent = `${count} RESULT${count !== 1 ? 'S' : ''}`;
};

// Function to render an individual item
const renderSingleItem = (item) => {
  return `
      <li>
          <div class="item-container">
              <img src="${item.image}" alt="${item.itemName}">
              <h2>${item.itemName}</h2>
          </div>
      </li>
  `;
};

// Function to render list items
  const renderItems = (data) => {
  const dataList = document.getElementById('data-list');
  data.forEach((item) => {
      dataList.insertAdjacentHTML('beforeend', renderSingleItem(item));
  });

  updateResultsText(data.length);
};


document.getElementById('menu').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

let searchFilter = {
  mealType: '',
  cuisineType: '',
  cookTime: '',
  ingredients: ''
}

// Function to render items based on meal type
  const renderMeals = (data, filter) => {
  let filteredMeals = items;

  if (filter.mealType !== '')
    filteredMeals = data.filter(item => item.mealType.includes(filter.mealType));

  if (filter.cuisineType !== '')
    filteredMeals = filteredMeals.filter(item => item.cuisine === filter.cuisineType);

  if (filter.cookTime !== '')
    filteredMeals = filteredMeals.filter(item => parseInt(item.cookTime) <= parseInt(filter.cookTime));

  if (filter.ingredients !== '')
    filteredMeals = filteredMeals.filter(item => item.ingredients.includes(filter.ingredients));
  
  // Render filtered meals
  const dataList = document.getElementById('data-list');
  dataList.innerHTML = '';
  renderItems(filteredMeals);
  return filteredMeals;
};


const buttonMealTypeList = {
  'breakfast-button': 'Breakfast',
  'lunch-button': 'Lunch',
  'dinner-button': 'Dinner',
  'dessert-button': 'Dessert',
  'beverages-button': 'Beverages',
  'snacks-button': 'Snacks',
  'quick-button': 'Quick',
  'fancy-button': 'Fancy',
  'noodles-button': 'Noodles',
  'pasta-button': 'Pasta',
  'breads-button': 'Breads',
  'wraps-button': 'Wraps'
};

function filterCuisine() {
  let cuisineType = document.getElementById("cuisine-select").value;
  searchFilter.cuisineType = cuisineType;
  renderMeals(items, searchFilter);
}

function filterCookTime() {
  let cookTime = document.getElementById("time-select").value;
  searchFilter.cookTime = cookTime;
  renderMeals(items, searchFilter);
}

function filterIngredients() {
  let ingredientType = document.getElementById("ingredient-select").value;
  searchFilter.ingredients = ingredientType;
  renderMeals(items, searchFilter);
}

function resetFilters() {

  location.reload();

}

const allButton = document.getElementById('all-button');

// Add click event listener to 'All' button
allButton.addEventListener('click', () => {
  // Reset the filters
  searchFilter = {
    mealType: '',
    cuisineType: '',
    cookTime: '',
    ingredients: ''
  }

  // Render all items
  renderItems(items);

    // Change font color and style for all li elements
    const categoryList = document.querySelectorAll('.category-list li');
    categoryList.forEach(li => {
      li.style.color = ''; // Reset font color
      li.style.fontStyle = ''; // Reset font style
      li.style.borderBottom = ''; // Reset Underline
    });

    // Change font color and style for the 'All' button
    allButton.parentNode.style.color = 'var(--main-text-color)'; // Change font color
    allButton.parentNode.style.fontStyle = 'italic'; // Change font style
    allButton.parentNode.style.borderBottom = '2px solid var(--main-text-color)';
});


// Define the function to reset filters and render all items
function resetAndRenderAll() {
  // Reset the filters
  searchFilter = {
    mealType: '',
    cuisineType: '',
    cookTime: '',
    ingredients: ''
  };

  // Render all items
  renderItems(items);

  // Change font color and style for the 'All' button
  allButton.parentNode.style.color = 'var(--main-text-color)'; // Change font color
  allButton.parentNode.style.fontStyle = 'italic'; // Change font style
  allButton.parentNode.style.borderBottom = '2px solid var(--main-text-color)';
}

// Call the function to set the default state when the page loads
document.addEventListener('DOMContentLoaded', resetAndRenderAll);


// Fetch gets your (local) JSON file…
fetch('assets/data.json')
  .then(response => response.json())
  .then(data => {
      items = data;
      // Initial rendering of all items
      renderItems(data);

      Object.keys(buttonMealTypeList).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button.addEventListener('click', () => {
          const mealType = buttonMealTypeList[buttonId];
          searchFilter.mealType = mealType;
          renderMeals(items, searchFilter);

        // Change font color and style for all li elements
    const categoryList = document.querySelectorAll('.category-list li');
    categoryList.forEach(li => {
      li.style.color = ''; // Reset font color
      li.style.fontStyle = ''; // Reset font style
      li.style.borderBottom = ''; // Reset Underline
    });
    // Change font color and style for the clicked li element
    button.parentNode.style.color = 'var(--main-text-color)'; // Change font color
    button.parentNode.style.fontStyle = 'italic'; // Change font style
    button.parentNode.style.borderBottom = '2px solid var(--main-text-color)';
  });
      });
  });
