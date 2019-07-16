import { populateDropdownMenu } from './js/populateDropdownMenu.js'
// import { selectors } from './js/selectors.js/index.js'

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

// Checkbox --> TODO
// const completedBoxesBtn = document.querySelectorAll('')

// Dropdown --> TODO
//

// ------------TESTS REMOVE THIS
// addRecipeBtn.addEventListener('click', () => {
//   console.log('add-recipe')
// })

// addItem.addEventListener('input', (event) => {
//   console.log(event.target.value)
// })

// ------------NETWORK TESTS
// fetch(BackEndURL + 'Groceries.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })

// fetch(BackEndURL + '/testGroceries/Japan dinner.json', {
//   method: 'PATCH',
//   body: JSON.stringify({ Mochi: 1, Water: 0 })
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })

// -----------------------------------------------------------

const insertRecipesHTML = (itemName, selector, completed) => {
  let html = ''
  if (completed) {
    html = `<label class="item">
    <p class="text-linethrough">${itemName}</p>
    <input type="checkbox" aria-label="Checkbox for following text input" checked>
    </label>`
  } else {
    html = `<label class="item">
    <p>${itemName}</p>
    <input type="checkbox" aria-label="Checkbox for following text input">
    </label>`
  }
  document.querySelector(selector).insertAdjacentHTML('beforeend', html)
}

const populateContainers = (recipe = 'All') => {
  document.querySelector(DOMStrings.completedItems).innerHTML = ''
  document.querySelector(DOMStrings.pendingItems).innerHTML = ''
  if (recipe === 'All') {
    fetchAllRecipes()
  } else {
    fetchRecipe(recipe)
  }
}

const fetchAllRecipes = () => {
  fetch(BackEndURL + domain + '.json')
    .then(response => response.json())
    .then(data => {
      const sizeData = Object.keys(data).length
      for (let i = 0; i < sizeData; i++) {
        const ingredientsArray = Object.entries(Object.values(data)[i])
        ingredientsArray.forEach(ingArray => {
          if (ingArray[1] === 1) {
            insertRecipesHTML(ingArray[0], DOMStrings.completedItems, true)
          } else {
            insertRecipesHTML(ingArray[0], DOMStrings.pendingItems, false)
          }
        })
      }
    })
}

const fetchRecipe = (recipe) => {
  recipe = encodeURI(recipe)
  const path = `${domain}/${recipe}.json`
  fetch(BackEndURL + path)
    .then(response => response.json())
    .then(data => {
      const ingredientsArray = Object.entries(data)
      ingredientsArray.forEach(ingArray => {
        if (ingArray[1] === 1) {
          insertRecipesHTML(ingArray[0], DOMStrings.completedItems, true)
        } else {
          insertRecipesHTML(ingArray[0], DOMStrings.pendingItems, false)
        }
      })
    })
}

populateContainers()

// -------------------------------------------------------------

// const populateDropdown = (recipes, selector) => {
//   const htmlAll = `<a class="dropdown-item" href="#">All</a>`
//   document.querySelector(selector).insertAdjacentHTML('beforeend', htmlAll)
//   recipes.forEach(recipe => {
//     const html = `<a class="dropdown-item" href="#">${recipe}</a>`
//     document.querySelector(selector).insertAdjacentHTML('beforeend', html)
//   })
// }

// fetch(BackEndURL + 'Groceries.json')
//   .then(response => response.json())
//   .then(data => {
//     const recipes = Object.keys(data)
//     // console.log(recipes)
//     populateDropdown(recipes, DOMStrings.dropDownRecipes)
//   })

// console.log(data.BackEndURL)
populateDropdownMenu()
// -------------------------------------------------------------

const showDropDownSelection = (recipe) => {
  document.querySelector(DOMStrings.recipesSelection).innerText = recipe
}

document.querySelector(DOMStrings.dropDownRecipes).addEventListener('click', (event) => {
  // console.log(event.target.textContent)
  const selection = event.target.textContent
  showDropDownSelection(selection)
  populateContainers(selection)
})

// --------------------------------------------------------
