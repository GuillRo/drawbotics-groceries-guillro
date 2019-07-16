import { BackEndURL } from './data.mjs'

const populateDropdownMenu = () => {
  const insertDropdownHTML = (recipes, selector) => {
    const htmlAll = `<a class="dropdown-item" href="#">All</a>`
    document.querySelector(selector).insertAdjacentHTML('beforeend', htmlAll)
    recipes.forEach(recipe => {
      const html = `<a class="dropdown-item" href="#">${recipe}</a>`
      document.querySelector(selector).insertAdjacentHTML('beforeend', html)
    })
  }

  fetch(BackEndURL + 'Groceries.json')
    .then(response => response.json())
    .then(data => {
      const recipes = Object.keys(data)
      // console.log(recipes)
      insertDropdownHTML(recipes, data.DOMStrings.dropDownRecipes)
    })
}

export default { populateDropdownMenu }
