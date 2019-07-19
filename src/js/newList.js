import { DOMStrings, BackEndURL } from './dataStrings.js'
import { insertFectchedListsInDropdown } from './js/dropdown.js'

const addListToDB = (listName) => {
  fetch(BackEndURL + `/${listName}.json`, {
    method: 'PATCH',
    body: ''
  })
    .then(response => response.json())
    .then(data => {
      insertFectchedListsInDropdown()
    })
}

const newList = () => {
  const listName = ''
  document.querySelector(DOMStrings.inputList).addEventListener('input', (event) => {
    console.log(event.target.value)
  })
}
