import { DOMStrings, BackEndURL } from './dataStrings.js'
import { loadIngredients, patchIngredient } from './ingredients.js'
import { insertFectchedListsInDropdown } from './dropdown.js'

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
  document.querySelector(DOMStrings.dropDownlists).addEventListener('mousedown', (event) => {
    const selectedList = event.target.textContent
    switch (event.button) {
      case 0:
        // left mouse button
        break
      case 1:
        // middle mouse button
        break
      default:
        event.preventDefault()
        console.log(selectedList)
        fetch(BackEndURL + `.json`, {
          method: 'PATCH',
          body: `{"${selectedList}": null}`
        })
          .then(response => response.json())
          .then(data => {
            insertFectchedListsInDropdown()
            loadIngredients()
          })
      // 2 === right mouse button
    }
  })
}

const addListenerCheckboxes = () => {
  document.querySelectorAll(DOMStrings.item).forEach(chkBox => {
    chkBox.addEventListener('change', (event) => {
      // console.log(event.target.checked)
      const checked = event.target.checked
      const name = decodeURI(chkBox.children[1].name.split('-')[0])
      const list = decodeURI(chkBox.children[1].name.split('-')[1])
      patchIngredient(name, list, checked)
    })
    chkBox.addEventListener('mousedown', (event) => {
      switch (event.button) {
        case 0:
          // left mouse button
          break
        case 1:
          // middle mouse button
          break
        default:
          event.preventDefault()
          // event.stopPropagation()
          console.log(decodeURI(chkBox.children[1].name.split('-')[0]), decodeURI(chkBox.children[1].name.split('-')[1]))
          const checked = event.target.checked
          const name = decodeURI(chkBox.children[1].name.split('-')[0])
          const list = decodeURI(chkBox.children[1].name.split('-')[1])
          patchIngredient(name, list, checked, true)
        // 2 === right mouse button
      }
    })
  })
}

export { completedButtonHandler, showDropdownSelectedList, addListenerCheckboxes }
