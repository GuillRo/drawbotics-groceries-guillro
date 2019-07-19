import { loadIngredients } from './js/items.js'
import { insertFectchedListsInDropdown } from './js/lists.js'
import * as events from './js/events.js'
import { DOMStrings, BackEndURL } from './js/dataStrings.js'

loadIngredients()
insertFectchedListsInDropdown()
events.completedButtonHandler()
events.showDropdownSelectedList()
events.addListOnClickEvent()
events.addItemOnClickEvent()
