import { populateDropdownMenu } from './js/populateDropdownMenu.js'
import { populateContainers } from './js/populateContainers.js'
import { showDropdownSelection } from './js/showDropdownSelection.js'

populateContainers()
populateDropdownMenu()
showDropdownSelection()

// Checkbox --> TODO
// const completedBoxesBtn = document.querySelectorAll('')

// ------------TESTS REMOVE THIS
// addRecipeBtn.addEventListener('click', () => {
//   console.log('add-recipe')
// })

// addItem.addEventListener('input', (event) => {
//   console.log(event.target.value)
// })

// ------------NETWORK TESTS
// fetch(BackEndURL + 'Groceries.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })

// fetch(BackEndURL + '/testGroceries/Japan dinner.json', {
//   method: 'PATCH',
//   body: JSON.stringify({ Mochi: 1, Water: 0 })
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })
