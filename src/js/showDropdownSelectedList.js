import { DOMStrings } from './dataStrings.js'
import { populateContainers } from './populateContainers.js'

const showDropdownSelectedList = () => {
  document.querySelector(DOMStrings.dropDownlists).addEventListener('click', (event) => {
    // console.log(event.target.textContent)
    const selectedList = event.target.textContent
    document.querySelector(DOMStrings.listSelection).innerText = selectedList
    populateContainers(selectedList)
  })
}

export { showDropdownSelectedList }
