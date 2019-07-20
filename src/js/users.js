import { DOMStrings, BackEndURL } from './dataStrings.js'
// import { logUserEvent } from './events.js';

const isLogged = () => {
  return false
}

const signOutUser = () => {
  document.querySelector(DOMStrings.centerLoggedIn).style.display = "none"
  document.querySelector(DOMStrings.logoutLink).style.display = "none"
  document.querySelector(DOMStrings.centerLoggedOut).style.cssText = ''
}

const signInUser = (login) => {
  document.querySelector(DOMStrings.centerLoggedOut).style.display = "none"
  document.querySelector(DOMStrings.logoutLink).style.cssText = ''
  document.querySelector(DOMStrings.centerLoggedIn).style.cssText = ''
}

// Display error message for invalid login or password.
const errorUser = (msg) => {
  const html = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Invalid login/password</strong> ${msg}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`
  document.querySelector('#body').insertAdjacentHTML('afterbegin', html)
}

// Fetch user in the DB. 
const fetchUserInDB = async (credentials) => {
  let msg = ''
  const response = await fetch(BackEndURL + `/${credentials.login}/Password.json`)
  const data = await response.json()
  if (!data) {
    // console.log('no such user')
    msg = "User not found"
  } else if (data.toString() === credentials.password.toString()) {
    // console.log('true')
    msg = 'ok'
  } else {
    msg = 'Invalid password'
  }
  return msg
}

// Validate the user's login and password before fetching.
const validateCredentials = (credentials) => {
  if (credentials.login.match(/([^\wéèàç])/) || credentials.password.match(/([^\wéèàç])/)) {
    const msg = 'Login and password must be composed of letters and numerals.'
    errorUser(msg)
  } else if (credentials.login.length < 2 || credentials.password.length < 6) {
    const msg = 'Login must be at least 2 characters long and password must be at least 6 characters long'
    errorUser(msg)
  } else {
    // console.log(fetchUserInDB())
    fetchUserInDB(credentials).then(msg => {
      if (msg === 'ok') {
        signInUser(credentials.login)
      } else {
        errorUser(msg)
      }
    })
  }
}



export { isLogged, validateCredentials, signOutUser }