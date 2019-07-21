import { DOMStrings, BackEndURL } from './dataStrings.js'
import { completeItemsOnLeftClick, deleteItemsOnRightClick, } from './events.js'
import { insertFectchedListsInDropdown, redirectToList } from './lists.js';

// Insert items in the DOM, in the completed or uncompleted zone according to
// their state in the DB.
const insertItemHTML = (itemName, list, selector, completed) => {
  let html = ''
  if (completed) {
    html = `<label class="item" oncontextmenu="return false;">
    <p class="text-linethrough">${itemName}</p>
    <input name="${itemName}-${list}" type="checkbox" aria-label="Checkbox for following text input" class="ing-checkbox" checked>
    </label>`
  } else {
    html = `<label class="item" oncontextmenu="return false;">
    <p>${itemName}</p>
    <input name="${itemName}-${list}" type="checkbox" aria-label="Checkbox for following text input" class="ing-checkbox">
    </label>`
  }
  document.querySelector(selector).insertAdjacentHTML('beforeend', html)
}

// Fetch the items of a specific list in the DB and then insert them to the DOM.
const fetchItemsOfAList = (user, list) => {
  list = encodeURI(list)
  const path = `/${user}/Groceries/${list}.json`
  fetch(BackEndURL + path)
    .then(response => response.json())
    .then(data => {
      const itemsArray = Object.entries(data)
      itemsArray.forEach(ingArray => {
        if (ingArray[0] !== 'thisIsADummyData') {
          if (ingArray[1] === 1) {
            insertItemHTML(ingArray[0], list, DOMStrings.completedItems, true)
          } else {
            insertItemHTML(ingArray[0], list, DOMStrings.pendingItems, false)
          }
        }
      })
      completeItemsOnLeftClick(user)
      deleteItemsOnRightClick(user)
    })
}

// Fetch all items in the DB from a specific user.
const fetchAll = (user) => {
  fetch(BackEndURL + `/${user}/Groceries.json`)
    .then(response => response.json())
    .then(data => {
      const numberOfLists = Object.keys(data).length
      for (let i = 0; i < numberOfLists; i++) {
        const listName = Object.keys(data)[i]
        const itemsArray = Object.entries(Object.values(data)[i])
        itemsArray.forEach(ingArray => {
          if (ingArray[0] !== 'thisIsADummyData') {
            if (ingArray[1] === 1) {
              insertItemHTML(ingArray[0], listName, DOMStrings.completedItems, true)
            } else {
              insertItemHTML(ingArray[0], listName, DOMStrings.pendingItems, false)
            }
          }
        })
      }
      completeItemsOnLeftClick(user)
      deleteItemsOnRightClick(user)
    })
}

// Empty the items of a specific list and reload them.
const loadItems = (user, list = 'All') => {
  document.querySelector(DOMStrings.completedItems).innerHTML = ''
  document.querySelector(DOMStrings.pendingItems).innerHTML = ''
  if (list === 'All') {
    fetchAll(user)
  } else {
    fetchItemsOfAList(user, list)
  }
}

// Modify the state of an item (completed or uncompleted)
// this method is also used to suppress an element, since Firebase does not accept
// documents without a Value.
const patchItem = (user, item, listToPatch, checked, deleteItem = false) => {
  const displayedList = document.querySelector(DOMStrings.listSelection).innerText
  const value = checked ? 1 : 0
  let patchString = `{"${item}":${value}}`
  if (deleteItem) {
    patchString = `{"${item}": null}`
  }
  fetch(BackEndURL + `/${user}/Groceries/${listToPatch}.json`, {
    method: 'PATCH',
    body: patchString
  })
    .then(response => response.json())
    .then(data => {
      loadItems(user, displayedList)
    })
}

// Add new item in the DB. Display an error if the item name is not valid.
const addItemToList = (user, itemName, listName) => {
  if (itemName.length < 2 || itemName.length > 24 || itemName.match(/([^\wéèàç ])/)) {
    const reason = 'Item name must be between 2 and 24 characters long and composed of letters or numerals.'
    const html = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Invalid item name</strong> ${reason}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
  document.querySelector('#body').insertAdjacentHTML('afterbegin', html)
  } else {
    const list = listName === 'All' ? 'Unsorted' : listName
    fetch(BackEndURL + `/${user}/Groceries/${list}.json`, {
      method: 'PATCH',
      body: `{"${itemName}":0}`
    })
      .then(response => response.json())
      .then(data => {
        insertFectchedListsInDropdown(user)
        redirectToList(user, list)
      })
  }
}

export { loadItems, patchItem, addItemToList }
