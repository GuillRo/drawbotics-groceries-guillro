const selectors = {
  addRecipeBtn: document.getElementById('add-recipe'),
  completedBtn: document.getElementById('btn-completed'),
  addItem: document.getElementById('new-ingredient'),
  loginBtn: document.getElementById('login-link'),
  listBtn: document.getElementById('list-link'),
  statsBtn: document.getElementById('stats-link'),
  recipesBtn: document.getElementById('recipes-link'),
  checkboxes: '.ing-checkbox',
  DOMStrings: {
    completedItems: '#completed-items',
    pendingItems: '#pending-items',
    dropDownRecipes: '#dropdown-recipes',
    recipesSelection: '#dropdown-recipes-selection'
  },
  BackEndURL: 'https://drawbotics-petpro-guillro.firebaseio.com/',
  domain: 'Groceries'
}

export { selectors }
