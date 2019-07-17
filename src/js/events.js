import { DOMStrings } from './dataStrings.js'
import { loadIngredients, patchIngredient } from './ingredients.js'

const completedButtonHandler = () => {
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
}

const showDropdownSelectedList = () => {
  document.querySelector(DOMStrings.dropDownlists).addEventListener('click', (event) => {
    // console.log(event.target.textContent)
    const selectedList = event.target.textContent
    document.querySelector(DOMStrings.listSelection).innerText = selectedList
    loadIngredients(selectedList)
  })
}

const addListenerCheckboxes = () => {
  document.querySelectorAll(DOMStrings.checkboxes).forEach(chkBox => {
    chkBox.addEventListener('change', (event) => {
      // console.log(event.target.checked)
      const checked = event.target.checked
      const name = decodeURI(chkBox.name.split('-')[0])
      const list = decodeURI(chkBox.name.split('-')[1])
      patchIngredient(name, list, checked)
    })
  })
}

export { completedButtonHandler, showDropdownSelectedList, addListenerCheckboxes }
