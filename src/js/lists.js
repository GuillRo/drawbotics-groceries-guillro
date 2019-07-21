import { DOMStrings, BackEndURL } from './dataStrings.js'
import { loadItems } from './items.js';

// Fetch lists name in DB.
const fetchListsNames = async (user) => {
  let response = await fetch(BackEndURL + `/${user}/Groceries.json`)
  // console.log(response)
  let data = await response.json()
  return Object.keys(data)
}

// Insert the different lists' names in the dropdown menu.
const insertFectchedListsInDropdown = (user) => {
  const selector = DOMStrings.dropDownlists
  document.querySelector(selector).innerHTML = ''
  const insertDropdownHTML = (lists) => {
    const htmlAll = `<a class="dropdown-item" href="#">All</a>`
    document.querySelector(selector).insertAdjacentHTML('beforeend', htmlAll)
    lists.forEach(list => {
      if (list !== 'thisIsADummyList') {
        const html = `<a class="dropdown-item" href="#">${list}</a>`
        document.querySelector(selector).insertAdjacentHTML('beforeend', html)
      }
    })
  }
  fetchListsNames(user).then((lists) => {
    insertDropdownHTML(lists)
  })
}

// Validate the name of the new list. Return true if the list name is valid.
const validateListName = async (user, listName) => {
  if (listName.length < 2 || listName.length > 16 || listName === 'All' || listName === 'Unsorted' || listName.match(/([^\wéèàç ])/)) {
    return false
  }
  const fetchedLists = await fetchListsNames(user)
  for (const list of fetchedLists) {
    if (list === listName) {
      return false
    }
  }
  return true
}

// Redirect to a specific list.
const redirectToList = (user, listName) => {
  document.querySelector(DOMStrings.listSelection).innerText = listName
  loadItems(user, listName)
}

// Add a list to the DB.
const addListToDB = (user, listName) => {
  validateListName(user, listName).then(isValid => {
    if (isValid) {
      fetch(BackEndURL + `/${user}/Groceries/${listName}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ thisIsADummyData: 0 })
      })
        .then(response => response.json())
        .then(data => {
          insertFectchedListsInDropdown(user)
          redirectToList(user, listName)
        })
    } else {
      const reason = 'List name must be unique, between 2 and 16 characters long and composed of letters or numerals.'
      const html = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Invalid list name</strong> ${reason}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
      document.querySelector('#body').insertAdjacentHTML('afterbegin', html)
    }
  })
}

const deleteList = (user, list) => {
  fetch(BackEndURL + `/${user}/Groceries.json`, {
    method: 'PATCH',
    body: `{"${list}": null}`
  })
    .then(response => response.json())
    .then(data => {
      insertFectchedListsInDropdown(user)
      redirectToList(user, 'All')
    })
}

export { insertFectchedListsInDropdown, addListToDB, redirectToList, deleteList }
