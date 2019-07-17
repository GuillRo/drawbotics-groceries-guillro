import { loadIngredients } from './js/ingredients.js'
import { addListsToDropdown } from './js/dropdown.js'
import * as events from './js/events.js'

loadIngredients()
addListsToDropdown()
events.completedButtonHandler()
events.showDropdownSelectedList()
