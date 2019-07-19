// Relevant CSS selectors
const DOMStrings = {
  completedItems: '#completed-items',
  pendingItems: '#pending-items',
  dropDownlists: '#dropdown-lists',
  listSelection: '#dropdown-lists-selection',
  // checkboxes: '.ing-checkbox',
  completedBtn: '#btn-completed',
  inputList: '#new-list-input',
  // formNewList: '#add-list',
  sendListBtn: '#send-list',
  inputIngredient: '#new-item',
  modalLists: '#modal-input-lists',
  item: '.item'
}
// Endpoint of the Firebase API.
const BackEndURL = 'https://drawbotics-petpro-guillro.firebaseio.com/Groceries'

export { DOMStrings, BackEndURL }
