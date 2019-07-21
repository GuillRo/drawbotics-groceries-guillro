import { loadItems } from './js/items.js'
import { insertFectchedListsInDropdown } from './js/lists.js'
import * as events from './js/events.js'
import { DOMStrings, BackEndURL } from './js/dataStrings.js'

// // Fetch and display initial data
//   loadItems()
//   insertFectchedListsInDropdown()

const user = 'John'

  // Start the events.
  events.showDropdownSelectedList(user)
  events.addListOnClickEvent(user)
  events.addItemOnEnterPressEvent(user)
  events.addListOnEnterPressEvent(user)
  events.completedButtonHandler()
  events.logoutHandler()
  events.logUserEvent()


