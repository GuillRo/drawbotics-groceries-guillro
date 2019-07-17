import { DOMStrings, BackEndURL } from './dataStrings.js'

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
  
}
const populateContainers = (list = 'All') => {
  document.querySelector(DOMStrings.completedItems).innerHTML = ''
  document.querySelector(DOMStrings.pendingItems).innerHTML = ''
  if (list === 'All') {
    fetchAll()
  } else {
    fetchIngredients(list)
  }
}

const addListenerCheckboxes = () => {
  document.querySelectorAll(DOMStrings.checkboxes).forEach(chkBox => {
    chkBox.addEventListener('change', (event) => {
      // console.log(event.target.checked)
      const checked = event.target.checked
      const name = chkBox.name.split('-')[0]
      const list = chkBox.name.split('-')[1]
      patchIngredient(name, list, checked)
    })
  })
}

const patchIngredient = (ingName, ingList, checked) => {
  // const listName = document.querySelector(DOMStrings.listSelection).innerText
  const value = checked ? 1 : 0
  const patchString = `{"${ingName}":${value}}`
  fetch(BackEndURL + `/${encodeURI(ingList)}.json`, {
    method: 'PATCH',
    body: patchString
  })
    .then(response => response.json())
    .then(data => {
      populateContainers(ingList)
    })
}
export { populateContainers }
