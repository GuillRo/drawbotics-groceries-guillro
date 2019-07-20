import { loadItems } from './js/items.js'
import { insertFectchedListsInDropdown } from './js/lists.js'
import * as events from './js/events.js'
import { DOMStrings, BackEndURL } from './js/dataStrings.js'

// Fetch and display initial data
loadItems()
insertFectchedListsInDropdown()

// Start the events.
events.completedButtonHandler()
events.showDropdownSelectedList()
events.addListOnClickEvent()
events.addItemOnEnterPressEvent()
events.addListOnEnterPressEvent()

