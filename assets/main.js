

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
    filteredMeals = filteredMeals.filter(item => item.cookTime === filter.cookTime);

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
  let cuisineType = document.getElementById("cuisine-select").value;
  searchFilter.cuisineType = cuisineType;
  renderMeals(items, searchFilter);
}

function resetFilters() {

  searchFilter = {
    mealType: '',
    cuisineType: '',
    cookTime: '',
    ingredients: ''
  }

  renderMeals(items, searchFilter);

}


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
        });
      });
  });
