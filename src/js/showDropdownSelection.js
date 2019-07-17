import { selectors } from './selectors.js'
import { populateContainers } from './populateContainers.js'

const insertRecipeInDropdown = (recipe) => {
  document.querySelector(selectors.DOMStrings.recipesSelection).innerText = recipe
}

const showDropdownSelection = () => {
  document.querySelector(selectors.DOMStrings.dropDownRecipes).addEventListener('click', (event) => {
    // console.log(event.target.textContent)
    const selection = event.target.textContent
    insertRecipeInDropdown(selection)
    populateContainers(selection)
  })
}

export { showDropdownSelection }
