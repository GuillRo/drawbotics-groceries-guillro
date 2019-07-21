import { DOMStrings, BackEndURL } from './dataStrings.js'
import { loadItems, patchItem, addItemToList } from './items.js'
import { insertFectchedListsInDropdown, addListToDB, redirectToList, deleteList } from './lists.js'
import { validateCredentials, signOutUser } from './users.js'

// Handle the "completed" button's chevron (up or down) and display or remove the "completed" items.
const completedButtonHandler = () => {
  document.querySelector(DOMStrings.completedBtn).addEventListener('click', (event) => {
    const chevronUp = event.target.children[0]
    const chevronDown = event.target.children[1]
    if (chevronUp.classList.contains('active')) {
      chevronUp.classList.remove('active')
      chevronUp.style.display = 'none'
      chevronDown.classList.add('active')
      chevronDown.style.cssText = ''
      document.querySelector(DOMStrings.completedItems).style.display = 'none'
    } else {
      chevronUp.classList.add('active')
      chevronUp.style.cssText = ''
      chevronDown.classList.remove('active')
      chevronDown.style.display = 'none'
      document.querySelector(DOMStrings.completedItems).style.cssText = ''
    }
  })
}

// Handle the dropdown menu displaying the differents lists.
// Left-click on a list's name in the dropwdown menu will display it as the current list.
// Right-click on a list's name will delete the whole list.
const showDropdownSelectedList = (user) => {
  document.querySelector(DOMStrings.dropDownlists).addEventListener('click', (event) => {
    const selectedList = event.target.textContent
    document.querySelector(DOMStrings.listSelection).innerText = selectedList
    loadItems(user, selectedList)
  })
  document.querySelector(DOMStrings.dropDownlists).addEventListener('mouseup', (event) => {
    const selectedList = event.target.textContent
    if (event.button === 2) {
      event.preventDefault()
      deleteList(user, selectedList)
    }
  })
}

// Left-click on an item will move it to the "completed" zone if it was uncompleted, and vice-versa.
const completeItemsOnLeftClick = (user) => {
  document.querySelectorAll(DOMStrings.item).forEach(item => {
    item.addEventListener('change', (event) => {
      const checked = event.target.checked
      const name = decodeURI(item.children[1].name.split('-')[0])
      const list = decodeURI(item.children[1].name.split('-')[1])
      patchItem(user, name, list, checked)
    })
  })
}

// Right-click on an item will delete it.
const deleteItemsOnRightClick = (user) => {
  document.querySelectorAll(DOMStrings.item).forEach(item => {
    item.addEventListener('mouseup', (event) => {
      const checked = event.target.checked
      const name = decodeURI(item.children[1].name.split('-')[0])
      const list = decodeURI(item.children[1].name.split('-')[1])
      if (event.button === 2) {
          event.preventDefault()
          patchItem(user, name, list, checked, true)
      }
    })
  })
}

// Click on the "Save" button in the modal will save the new list to the DB.
const addListOnClickEvent = (user) => {
  document.querySelector(DOMStrings.sendListBtn).addEventListener('click', (event) => {
    const listName = document.querySelector(DOMStrings.inputList).value
    addListToDB(user, listName)
    document.querySelector(DOMStrings.inputList).value = ''
    document.querySelector(DOMStrings.modalLists).click()
  })
}

// Clicking on "Enter" in the modal input will add the new list to the DB.
const addListOnEnterPressEvent = (user) => {
  document.querySelector(DOMStrings.inputList).addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  })

  document.querySelector(DOMStrings.inputList).addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      const listName = document.querySelector(DOMStrings.inputList).value
      addListToDB(user, listName)
      document.querySelector(DOMStrings.inputList).value = ''
      document.querySelector(DOMStrings.modalLists).click()
    }
  })
}

// Add an item to the list by pressing Enter.
const addItemOnEnterPressEvent = (user) => {
  document.querySelector(DOMStrings.inputIngredient).addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  })

  document.querySelector(DOMStrings.inputIngredient).addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      const newItem = document.querySelector(DOMStrings.inputIngredient).value
      const list = document.querySelector(DOMStrings.listSelection).innerText
      document.querySelector(DOMStrings.inputIngredient).value = ''
      addItemToList(user, newItem, list)
    }
  })
}

// Get login and password in their input fields and send them for validation.
const logUserEvent = () => {
  let login = document.querySelector(DOMStrings.inputLogin)
  let password = document.querySelector(DOMStrings.inputPassword)

  const getCredentials = () => {
    return JSON.parse(`{"login": "${login.value}", "password":"${password.value}"}`)
  }

  login.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      validateCredentials(getCredentials())
      login.value = ''
      password.value = ''
    }
  })

  password.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      validateCredentials(getCredentials())
      login.value = ''
      password.value = ''
    }
  })

  document.querySelector(DOMStrings.signInBtn).addEventListener('click', (event) => {
    validateCredentials(getCredentials())
    login.value = ''
    password.value = ''
  })
}

// logout the user when he/she clicks the "logout" button.
const logoutHandler = () => {
  document.querySelector(DOMStrings.logoutLink).addEventListener('click', () => {
    signOutUser()
  })
}

export {
  completedButtonHandler,
  showDropdownSelectedList,
  completeItemsOnLeftClick,
  deleteItemsOnRightClick,
  addListOnClickEvent,
  addItemOnEnterPressEvent,
  addListOnEnterPressEvent,
  logUserEvent,
  logoutHandler
}
