// Relevant CSS selectors
const DOMStrings = {
  completedItems: '#completed-items',
  pendingItems: '#pending-items',
  dropDownlists: '#dropdown-lists',
  listSelection: '#dropdown-lists-selection',
  completedBtn: '#btn-completed',
  inputList: '#new-list-input',
  sendListBtn: '#send-list',
  inputIngredient: '#new-item',
  modalLists: '#modal-input-lists',
  item: '.item',
  inputLogin: '#login-input',
  inputPassword: '#password-input',
  signInBtn: '#btn-signin',
  signUpBtn: '#btn-signup',
  centerLoggedIn: '.center',
  centerLoggedOut: '.center-login',
  logoutLink: '#logout-link'
}
// Endpoint of the Firebase API.
const BackEndURL = 'https://drawbotics-petpro-guillro.firebaseio.com/Users'

export { DOMStrings, BackEndURL }
