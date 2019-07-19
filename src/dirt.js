// // Firebase URL
// // This should probably be in a .env file
// const BackEndURL = 'https://drawbotics-petpro-guillro.firebaseio.com/'

// // CRUD buttons
// const addRecipeBtn = document.getElementById('add-recipe')
// const completedBtn = document.getElementById('btn-completed')
// const addItem = document.getElementById('new-ingredient')

// // Navigation buttons
// const loginBtn = document.getElementById('login-link')
// const listBtn = document.getElementById('list-link')
// const statsBtn = document.getElementById('stats-link')
// const recipesBtn = document.getElementById('recipes-link')

// // Selectors strings(Containers ID,..)
// const DOMStrings = {
//   completedItems: '#completed-items',
//   pendingItems: '#pending-items',
//   dropDownRecipes: '#dropdown-recipes',
//   recipesSelection: '#dropdown-recipes-selection'
// }

// API domain (Firebase)
// const domain = 'Groceries'

// Checkbox --> TODO
// const completedBoxesBtn = document.querySelectorAll('')

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

// const addListToDB = (listName) => {
//   fetch(BackEndURL + `/${listName}.json`, {
//     method: 'PATCH',
//     body: JSON.stringify({ thisIsADummyData: 0 })
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log(BackEndURL + `/${listName}.json`)
//       insertFectchedListsInDropdown()
//     })
// }

// const deleteItemFromList = (item, list) => {
//   fetch(BackEndURL + `/${list}.json`, {
//     method: 'pATCH',
//     body: `{"${item}"}`
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log(BackEndURL + `/${listName}.json`)
//       loadIngredients(listName)
//     })
// }