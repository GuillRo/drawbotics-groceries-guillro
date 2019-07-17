// Firebase URL
// This should probably be in a .env file
const BackEndURL = 'https://drawbotics-petpro-guillro.firebaseio.com/'

// CRUD buttons
const addRecipeBtn = document.getElementById('add-recipe')
const completedBtn = document.getElementById('btn-completed')
const addItem = document.getElementById('new-ingredient')

// Navigation buttons
const loginBtn = document.getElementById('login-link')
const listBtn = document.getElementById('list-link')
const statsBtn = document.getElementById('stats-link')
const recipesBtn = document.getElementById('recipes-link')

// Selectors strings(Containers ID,..)
const DOMStrings = {
  completedItems: '#completed-items',
  pendingItems: '#pending-items',
  dropDownRecipes: '#dropdown-recipes',
  recipesSelection: '#dropdown-recipes-selection'
}

// API domain (Firebase)
const domain = 'Groceries'