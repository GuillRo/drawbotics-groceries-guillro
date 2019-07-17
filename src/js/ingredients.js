import { DOMStrings, BackEndURL } from './dataStrings.js'
import { addListenerCheckboxes } from './events.js'

const insertIngredientsHTML = (itemName, list, selector, completed) => {
  let html = ''
  if (completed) {
    html = `<label class="item">
    <p class="text-linethrough">${itemName}</p>
    <input name="${itemName}-${list}" type="checkbox" aria-label="Checkbox for following text input" class="ing-checkbox" checked>
    </label>`
  } else {
    html = `<label class="item">
    <p>${itemName}</p>
    <input name="${itemName}-${list}" type="checkbox" aria-label="Checkbox for following text input" class="ing-checkbox">
    </label>`
  }
  document.querySelector(selector).insertAdjacentHTML('beforeend', html)
}

const fetchIngredients = (list) => {
  list = encodeURI(list)
  const path = `/${list}.json`
  fetch(BackEndURL + path)
    .then(response => response.json())
    .then(data => {
      const ingredientsArray = Object.entries(data)
      ingredientsArray.forEach(ingArray => {
        if (ingArray[1] === 1) {
          insertIngredientsHTML(ingArray[0], list, DOMStrings.completedItems, true)
        } else {
          insertIngredientsHTML(ingArray[0], list, DOMStrings.pendingItems, false)
        }
      })
      addListenerCheckboxes()
    })
}

const fetchAll = () => {
  fetch(BackEndURL + '.json')
    .then(response => response.json())
    .then(data => {
      const numberOfLists = Object.keys(data).length
      for (let i = 0; i < numberOfLists; i++) {
        const listName = Object.keys(data)[i]
        const ingredientsArray = Object.entries(Object.values(data)[i])
        ingredientsArray.forEach(ingArray => {
          if (ingArray[1] === 1) {
            insertIngredientsHTML(ingArray[0], listName, DOMStrings.completedItems, true)
          } else {
            insertIngredientsHTML(ingArray[0], listName, DOMStrings.pendingItems, false)
          }
        })
      }
      addListenerCheckboxes()
    })
}

const patchIngredient = (ingName, ingList, checked) => {
  const listName = document.querySelector(DOMStrings.listSelection).innerText
  const value = checked ? 1 : 0
  const patchString = `{"${ingName}":${value}}`
  fetch(BackEndURL + `/${ingList}.json`, {
    method: 'PATCH',
    body: patchString
  })
    .then(response => response.json())
    .then(data => {
      loadIngredients(listName)
    })
}

const loadIngredients = (list = 'All') => {
  document.querySelector(DOMStrings.completedItems).innerHTML = ''
  document.querySelector(DOMStrings.pendingItems).innerHTML = ''
  if (list === 'All') {
    fetchAll()
  } else {
    fetchIngredients(list)
  }
}
export { loadIngredients, patchIngredient }
