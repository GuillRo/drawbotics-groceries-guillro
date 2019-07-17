import { selectors } from './selectors.js'

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

const fetchAllRecipes = () => {
  fetch(selectors.BackEndURL + selectors.domain + '.json')
    .then(response => response.json())
    .then(data => {
      const sizeData = Object.keys(data).length
      for (let i = 0; i < sizeData; i++) {
        const ingredientsArray = Object.entries(Object.values(data)[i])
        ingredientsArray.forEach(ingArray => {
          if (ingArray[1] === 1) {
            insertRecipesHTML(ingArray[0], selectors.DOMStrings.completedItems, true)
          } else {
            insertRecipesHTML(ingArray[0], selectors.DOMStrings.pendingItems, false)
          }
        })
      }
    })
}

const fetchRecipe = (recipe) => {
  recipe = encodeURI(recipe)
  const path = `${selectors.domain}/${recipe}.json`
  fetch(selectors.BackEndURL + path)
    .then(response => response.json())
    .then(data => {
      const ingredientsArray = Object.entries(data)
      ingredientsArray.forEach(ingArray => {
        if (ingArray[1] === 1) {
          insertRecipesHTML(ingArray[0], selectors.DOMStrings.completedItems, true)
        } else {
          insertRecipesHTML(ingArray[0], selectors.DOMStrings.pendingItems, false)
        }
      })
    })
}

const populateContainers = (recipe = 'All') => {
  document.querySelector(selectors.DOMStrings.completedItems).innerHTML = ''
  document.querySelector(selectors.DOMStrings.pendingItems).innerHTML = ''
  if (recipe === 'All') {
    fetchAllRecipes()
  } else {
    fetchRecipe(recipe)
  }
}

export { populateContainers }
