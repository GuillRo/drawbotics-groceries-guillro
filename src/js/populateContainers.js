import { selectors } from './selectors.js'

const insertRecipesHTML = (itemName, selector, completed) => {
  let html = ''
  if (completed) {
    html = `<label class="item">
    <p class="text-linethrough">${itemName}</p>
    <input name="${itemName}" type="checkbox" aria-label="Checkbox for following text input" class="ing-checkbox" checked>
    </label>`
  } else {
    html = `<label class="item">
    <p>${itemName}</p>
    <input name="${itemName}" type="checkbox" aria-label="Checkbox for following text input" class="ing-checkbox">
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
      // console.log(document.querySelectorAll('.ing-checkbox'))
      // document.querySelectorAll(selectors.checkboxes).forEach(chkBox => {
      //   console.log(chkBox)
      //   chkBox.addEventListener('change', (event) => {
      //     console.log('click')
      //   })
      // })
      addListenerCheckboxes()
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
      addListenerCheckboxes()
      // console.log(document.querySelectorAll('.ing-checkbox'))
      // addListenerCheckboxes()
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

const addListenerCheckboxes = () => {
  document.querySelectorAll(selectors.checkboxes).forEach(chkBox => {
    // console.log(chkBox)
    chkBox.addEventListener('change', (event) => {
      // console.log(event.target)
      // console.log(chkBox.name)
      console.log(event.target.checked)
      const checked = event.target.checked
      patchIngredient(chkBox.name, checked)
    })
  })
}

const patchIngredient = (ingName, checked) => {
  // console.log(document.querySelector(selectors.DOMStrings.dropDownRecipes))
  console.log(document.querySelector(selectors.DOMStrings.recipesSelection).innerText)
  const listName = document.querySelector(selectors.DOMStrings.recipesSelection).innerText
  console.log(ingName)
  const value = checked ? 1 : 0
  const patchString = `{"${ingName}":${value}}`
  console.log(patchString)
  console.log(JSON.stringify({ Mochi: 1, Water: 0 }))
  fetch(selectors.BackEndURL + `${selectors.domain}/${encodeURI(listName)}.json`, {
    method: 'PATCH',
    body: patchString
  })
    .then(response => response.json())
    .then(data => {
      populateContainers(listName)
    })
  // setTimeout(populateContainers(listName), 500)
  // setTimeout(console.log('bidou'), 5000)
}
export { populateContainers }
