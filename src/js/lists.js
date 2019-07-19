import { DOMStrings, BackEndURL } from './dataStrings.js'

// Insert the different lists' names in the dropdown menu.
const insertFectchedListsInDropdown = () => {
  const selector = DOMStrings.dropDownlists
  document.querySelector(selector).innerHTML = ''

  const insertDropdownHTML = (lists) => {
    const htmlAll = `<a class="dropdown-item" href="#">All</a>`
    document.querySelector(selector).insertAdjacentHTML('beforeend', htmlAll)
    lists.forEach(list => {
      const html = `<a class="dropdown-item" href="#">${list}</a>`
      document.querySelector(selector).insertAdjacentHTML('beforeend', html)
    })
  }

  fetch(BackEndURL + '.json')
    .then(response => response.json())
    .then(data => {
      const lists = Object.keys(data)
      insertDropdownHTML(lists)
    })
}

// Add a list to the DB.
const addListToDB = (listName) => {
  fetch(BackEndURL + `/${listName}.json`, {
    method: 'PATCH',
    body: JSON.stringify({ thisIsADummyData: 0 })
  })
    .then(response => response.json())
    .then(data => {
      insertFectchedListsInDropdown()
    })
}

export { insertFectchedListsInDropdown, addListToDB }
