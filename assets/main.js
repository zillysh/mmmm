

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
        <button class="overlay-button">
            <div class="item-container">
                <img src="${item.image}" alt="${item.itemName}">
                <p>${item.itemName}</p>
            </div>
        </button>
        <div class="overlay">
            <button class="close-button">×</button>
            <section class="item-information-container">
              <section class="item-overlay-image">
                <img src="${item.image}" alt="${item.itemName}">
              </section>
              <section class="item-text-container">
                <div>
                  <h2>${item.itemName}</h2>
                  <h3>⏱︎${item.cookTime}</h3>
                  <h3>Ingredients</h3>
                  <ul>
                    ${item.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                  </ul>
                </div>
              </section>
            </section>
        <div>
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

  attachOverlayButtonListeners();

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


// Function to reset filters and render all items
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

  // Function to set the default state when the page loads
  document.addEventListener('DOMContentLoaded', resetAndRenderAll);

  function attachOverlayButtonListeners() {
    let openButtons = document.querySelectorAll('.overlay-button');

    openButtons.forEach((openButton) => {

      openButton.onclick = () => {
        console.log(openButton.parentElement.lastChild)
        openButton.parentElement.lastChild.classList.remove('overlay');
        openButton.parentElement.lastChild.classList.add('overlay-open');
      };
    });

    let closeButtons = document.querySelectorAll('.close-button');

    closeButtons.forEach((closeButton) => {

      closeButton.onclick = () => {
        closeButton.parentElement.classList.add('overlay');
        closeButton.parentElement.classList.remove('overlay-open');
      };

    });
  }

// Fetch gets your (local) JSON file…
fetch('assets/data.json')
  .then(response => response.json())
  .then(data => {
      items = data;
      // Initial rendering of all items
      renderItems(data);

      attachOverlayButtonListeners();
      Object.keys(buttonMealTypeList).forEach(buttonId => {
        const button = document.getElementById(buttonId);

        button.addEventListener('click', () => {
          const mealType = buttonMealTypeList[buttonId];
          searchFilter.mealType = mealType;
          const filteredMeals = renderMeals(items, searchFilter);
          if (filteredMeals.length > 0) {
            attachOverlayButtonListeners();
          }

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
  })


