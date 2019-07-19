import { populateDropdownMenu } from './js/populateDropdownMenu.js'
import { populateContainers } from './js/populateContainers.js'
import { showDropdownSelection } from './js/showDropdownSelection.js'
import { selectors } from './js/selectors.js'

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

selectors.completedBtn.addEventListener('click', (event) => {
  const chevronUp = event.target.children[0]
  const chevronDown = event.target.children[1]
  if (chevronUp.classList.contains('active')) {
    chevronUp.classList.remove('active')
    chevronUp.style.display = 'none'
    chevronDown.classList.add('active')
    chevronDown.style.cssText = ''
    document.querySelector(selectors.DOMStrings.completedItems).style.display = 'none'
  } else {
    chevronUp.classList.add('active')
    chevronUp.style.cssText = ''
    chevronDown.classList.remove('active')
    chevronDown.style.display = 'none'
    document.querySelector(selectors.DOMStrings.completedItems).style.cssText = ''
  }
})

//--------------------------

