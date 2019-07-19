import { loadIngredients } from './js/ingredients.js'
import { insertFectchedListsInDropdown } from './js/dropdown.js'
import * as events from './js/events.js'
import { DOMStrings, BackEndURL } from './js/dataStrings.js'

loadIngredients()
insertFectchedListsInDropdown()
events.completedButtonHandler()
events.showDropdownSelectedList()

document.querySelector(DOMStrings.sendListBtn).addEventListener('click', (event) => {
  // document.querySelector(DOMStrings.formNewList).submit()
  const test = document.querySelector(DOMStrings.inputList).value
  console.log(test)
  addListToDB(test)
  document.querySelector(DOMStrings.inputList).value = ''
  document.querySelector('#modalInputList').click()
})

document.querySelector(DOMStrings.inputList).addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault()
  }
})

document.querySelector(DOMStrings.inputList).addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault()
    // Trigger the button element with a click
    const test = document.querySelector(DOMStrings.inputList).value
    console.log(test)
    addListToDB(test)
    document.querySelector(DOMStrings.inputList).value = ''
    document.querySelector('#modalInputList').click()
  }
})

const addListToDB = (listName) => {
  fetch(BackEndURL + `/${listName}.json`, {
    method: 'PATCH',
    body: JSON.stringify({ thisIsADummyData: 0 })
  })
    .then(response => response.json())
    .then(data => {
      console.log(BackEndURL + `/${listName}.json`)
      insertFectchedListsInDropdown()
    })
}

// ---------------------------------------------------------------------
//  ADD INGREDIENTS

document.querySelector(DOMStrings.inputIngredient).addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault()
  }
})

document.querySelector(DOMStrings.inputIngredient).addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    const newItem = document.querySelector(DOMStrings.inputIngredient).value
    const list = document.querySelector(DOMStrings.listSelection).innerText
    console.log(newItem)
    console.log(list)
    document.querySelector(DOMStrings.inputIngredient).value = ''
    addItemToList(newItem, list)
  }
})

const addItemToList = (itemName, listName) => {
  fetch(BackEndURL + `/${listName}.json`, {
    method: 'PATCH',
    body: `{"${itemName}":0}`
  })
    .then(response => response.json())
    .then(data => {
      console.log(BackEndURL + `/${listName}.json`)
      loadIngredients(listName)
    })
}

// verification:
// nom entre 2 et 16 lettres
// verifier que nom pas deja pris ni que égal a 'all'
// idem pour item, verifier que pas deja dans list?

// -------------------------------------------------------

// document.querySelector(DOMStrings.checkboxes) {

// }
const deleteItemFromList = (item, list) => {
  fetch(BackEndURL + `/${list}.json`, {
    method: 'pATCH',
    body: `{"${item}"}`
  })
    .then(response => response.json())
    .then(data => {
      console.log(BackEndURL + `/${listName}.json`)
      loadIngredients(listName)
    })
}
