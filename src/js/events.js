import { DOMStrings, BackEndURL } from './dataStrings.js'
import { loadIngredients, patchIngredient, addItemToList } from './items.js'
import { insertFectchedListsInDropdown, addListToDB } from './lists.js'

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
    const selectedList = event.target.textContent
    document.querySelector(DOMStrings.listSelection).innerText = selectedList
    loadIngredients(selectedList)
  })
  document.querySelector(DOMStrings.dropDownlists).addEventListener('mousedown', (event) => {
    const selectedList = event.target.textContent
    switch (event.button) {
      case 0:
        break
      case 1:
        break
      default:
        event.preventDefault()
        fetch(BackEndURL + `.json`, {
          method: 'PATCH',
          body: `{"${selectedList}": null}`
        })
          .then(response => response.json())
          .then(data => {
            insertFectchedListsInDropdown()
            loadIngredients()
          })
    }
  })
}

const addListenerCheckboxes = () => {
  document.querySelectorAll(DOMStrings.item).forEach(chkBox => {
    chkBox.addEventListener('change', (event) => {
      const checked = event.target.checked
      const name = decodeURI(chkBox.children[1].name.split('-')[0])
      const list = decodeURI(chkBox.children[1].name.split('-')[1])
      patchIngredient(name, list, checked)
    })
    chkBox.addEventListener('mousedown', (event) => {
      switch (event.button) {
        case 0:
          break
        case 1:
          break
        default:
          event.preventDefault()
          const checked = event.target.checked
          const name = decodeURI(chkBox.children[1].name.split('-')[0])
          const list = decodeURI(chkBox.children[1].name.split('-')[1])
          patchIngredient(name, list, checked, true)
      }
    })
  })
}
const addListOnClickEvent = () => {
  document.querySelector(DOMStrings.sendListBtn).addEventListener('click', (event) => {
    const test = document.querySelector(DOMStrings.inputList).value
    addListToDB(test)
    document.querySelector(DOMStrings.inputList).value = ''
    document.querySelector('#modalInputList').click()
  })
}

document.querySelector(DOMStrings.inputList).addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault()
  }
})

document.querySelector(DOMStrings.inputList).addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault()
    const test = document.querySelector(DOMStrings.inputList).value
    addListToDB(test)
    document.querySelector(DOMStrings.inputList).value = ''
    document.querySelector('#modalInputList').click()
  }
})

const addItemOnClickEvent = () => {
  document.querySelector(DOMStrings.inputIngredient).addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  })

  document.querySelector(DOMStrings.inputIngredient).addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      const newItem = document.querySelector(DOMStrings.inputIngredient).value
      const list = document.querySelector(DOMStrings.listSelection).innerText
      document.querySelector(DOMStrings.inputIngredient).value = ''
      addItemToList(newItem, list)
    }
  })
}

export { completedButtonHandler, showDropdownSelectedList, addListenerCheckboxes, addListOnClickEvent, addItemOnClickEvent }
