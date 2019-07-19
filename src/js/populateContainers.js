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
      console.log(data)
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
        // console.log('kapout ', Object.keys(data)[i])
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
      const name = decodeURI(chkBox.name.split('-')[0])
      const list = decodeURI(chkBox.name.split('-')[1])
      patchIngredient(name, list, checked)
    })
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
      populateContainers(listName)
    })
}
export { populateContainers }
