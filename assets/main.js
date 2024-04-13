// Function to render an individual item
const renderSingleItem = (item) => {
  // Make a template literal as before
  return `
      <li>
          <div class="card-content">
              <img src="${item.image}" alt="${item.itemName}">
              <h2>${item.itemName}</h2>
          </div>
      </li>
  `;
};

// Function to render items
const renderItems = (data) => {
  // The `ul` where the items will be inserted
  const dataList = document.getElementById('data-list');

  // Loop through each item in the data array and render it
  data.forEach((item) => {
      dataList.insertAdjacentHTML('beforeend', renderSingleItem(item));
  });
};

// Function to render only quick meals
const renderQuickMeals = (data) => {
  // Calculate quick meals (items with cook time less than or equal to 10 minutes)
  const quickMeals = data.filter(item => parseInt(item.cookTime) <= 10);

  // Render quick meals
  renderItems(quickMeals);
};

// Function to render only dinner meals
const renderDinner = (data) => {
  // Filter items with mealType equal to 'Dinner'
  const dinner = data.filter(item => item.mealType === 'Dinner');

  // Render dinner meals
  renderItems(dinner);
};

// Fetch gets your (local) JSON file…
fetch('assets/data.json')
  .then(response => response.json())
  .then(data => {
      // Initial rendering of all items
      renderItems(data);

      // Add event listener to the quick meals button
      const quickMealsButton = document.getElementById('quick-meals-button');
      quickMealsButton.addEventListener('click', () => {
          // Clear existing items
          const dataList = document.getElementById('data-list');
          dataList.innerHTML = '';

          // Render only quick meals
          renderQuickMeals(data);
      });

      const dinnerButton = document.getElementById('dinner-button');
      dinnerButton.addEventListener('click', () => {
          // Clear existing items
          const dataList = document.getElementById('data-list');
          dataList.innerHTML = '';

          // Render only dinner meals
          renderDinner(data);
      });
  });
