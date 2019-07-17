import { populateDropdownMenu } from './js/populateDropdownMenu.js'
import { populateContainers } from './js/populateContainers.js'
import { showDropdownSelectedList } from './js/showDropdownSelectedList.js'
import { DOMStrings } from './js/dataStrings.js'

populateContainers()
populateDropdownMenu()
showDropdownSelectedList()
console.log(DOMStrings.completedBtn)
document.querySelector(DOMStrings.completedBtn).addEventListener('click', (event) => {
  const chevronUp = event.target.children[0]
  const chevronDown = event.target.children[1]
  if (chevronUp.classList.contains('active')) {
    chevronUp.classList.remove('active')
    chevronUp.style.display = 'none'
    chevronDown.classList.add('active')
    chevronDown.style.cssText = ''
    document.querySelector(DOMStrings.completedItems).style.display = 'none'
  } else {
    chevronUp.classList.add('active')
    chevronUp.style.cssText = ''
    chevronDown.classList.remove('active')
    chevronDown.style.display = 'none'
    document.querySelector(DOMStrings.completedItems).style.cssText = ''
  }
})

// --------------------------
