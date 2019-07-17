import { DOMStrings, BackEndURL } from './dataStrings.js'

const populateDropdownMenu = () => {
  const insertDropdownHTML = (lists, selector) => {
    const htmlAll = `<a class="dropdown-item" href="#">All</a>`
    document.querySelector(selector).insertAdjacentHTML('beforeend', htmlAll)
    lists.forEach(list => {
      const html = `<a class="dropdown-item" href="#">${list}</a>`
      document.querySelector(selector).insertAdjacentHTML('beforeend', html)
    })
  }

  fetch(BackEndURL + '.json')
    .then(response => response.json())
    .then(data => {
      const lists = Object.keys(data)
      insertDropdownHTML(lists, DOMStrings.dropDownlists)
    })
}

export { populateDropdownMenu }
