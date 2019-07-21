import { DOMStrings, BackEndURL } from './dataStrings.js'
import { loadItems } from './items.js'
import { insertFectchedListsInDropdown } from './lists.js'
import * as events from './events.js';

// Verify that a user exists to avoid errors.
const doesUserExist = async (userName) => {
  const response = await fetch(BackEndURL + `/${userName}.json`)
  const data = await response.json()
  return data ? true : false
}

// Change the display after user's logout.
const signOutUser = () => {
  window.location.reload(true);
}

// Load initial data of the user after he/she logged in.
// Load the necessary events to logout, add list, etc.
const signInUser = (login) => {
  doesUserExist(login).then(exist => {
    if (exist) {
      document.querySelector(DOMStrings.centerLoggedOut).style.display = "none"
      document.querySelector(DOMStrings.logoutLink).style.cssText = ''
      document.querySelector(DOMStrings.centerLoggedIn).style.cssText = ''
      loadItems(login)
      insertFectchedListsInDropdown(login)
      events.showDropdownSelectedList(login)
      events.addListOnClickEvent(login)
      events.addItemOnEnterPressEvent(login)
      events.addListOnEnterPressEvent(login)
    }
  })
}

// Display an error message for invalid login or password.
const errorUser = (msg) => {
  const html = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Invalid login/password</strong> ${msg}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`
  document.querySelector('#body').insertAdjacentHTML('afterbegin', html)
}

// Fetch user in the DB and verify her/his password.
// Returns an error message in case the user doesn't exist
// or if the password i invalid.
const fetchUserInDB = async (credentials) => {
  let msg = ''
  const response = await fetch(BackEndURL + `/${credentials.login}/Password.json`)
  const data = await response.json()
  if (!data) {
    msg = "User not found"
  } else if (data.toString() === credentials.password.toString()) {
    msg = 'ok'
  } else {
    msg = 'Invalid password'
  }
  return msg
}

// Validate the user's login and password before fetching the user in the DB.
const validateCredentials = (credentials) => {
  if (credentials.login.match(/([^\wéèàç ])/) || credentials.password.match(/([^\wéèàç ])/)
    || credentials.login.length < 2 || credentials.password.length < 6) {
    const msg = 'Please verify your login or password.'
    errorUser(msg)
  } else {
    fetchUserInDB(credentials).then(msg => {
      msg === 'ok' ? signInUser(credentials.login) : errorUser(msg)
    })
  }
}

// Create a new user with a dummy list (because Firebase won't accept an empty collection) and then log him/her.
const newUser = (login, password) => {
  fetch(BackEndURL + `/${login.toString()}.json`, {
    method: 'PATCH',
    body: `{"Password": "${password}", "Groceries": {"thisIsADummyList": {"thisIsADummyData": 0}}}`
  })
    .then(response => response.json())
    .then(data => {
      signInUser(login)
    })
}

// Verify that the new user's login and password are valid and not already taken.
// Display error message if not valid.
const validateNewUserLogin = (userName, password) => {
  if (userName.match(/([^\wéèàç ])/) || password.match(/([^\wéèàç ])/)) {
    errorUser('Login and password must be composed of letters and numerals.')
  } else if (userName.length < 2 || password.length < 6) {
    errorUser('Login must be at least 2 characters long and password must be at least 6 characters long')
  }
  fetch(BackEndURL + `.json`)
    .then(response => response.json())
    .then(data => {
      const logins = Object.keys(data)
      let valid = true
      for (const login of logins) {
        if (login === userName) { valid = false }
      }
      valid ? newUser(userName, password) : errorUser('This user name is already taken.')
    })
}

export { validateCredentials, signOutUser, validateNewUserLogin }