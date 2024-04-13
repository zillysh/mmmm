

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


// Function to render items based on meal type
  const renderMealsByType = (data, mealType) => {
  const filteredMeals = data.filter(item => item.mealType.includes(mealType));

  // Render filtered meals
  const dataList = document.getElementById('data-list');
  dataList.innerHTML = '';
  renderItems(filteredMeals);
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




// Fetch gets your (local) JSON file…
fetch('assets/data.json')
  .then(response => response.json())
  .then(data => {
      // Initial rendering of all items
      renderItems(data);

      Object.keys(buttonMealTypeList).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button.addEventListener('click', () => {
          const mealType = buttonMealTypeList[buttonId];
          renderMealsByType(data, mealType);
        });
      });
  });
