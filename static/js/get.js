import { activateDeleteButton } from "./delete.js"

/** @type {HTMLElement} */
const tableBody = document.getElementById('table-body');
const getTable = document.getElementById('get-table');

/** 
 * Current item being edited or deleted.
 * @type {{value: object|null}} 
 */
const currentItem = {value: null};

/**
 * Handles "Get" operations to fetch data from the 'get_data' endpoint,
 * and populate the table if successful. No return value.
 * @async
 * @function handleGet
 */
async function handleGet() {
    tableBody.innerHTML = "";
    console.log('handleget called');

    try {
        const response = await fetch('get_data');

        if (response.ok) {
            console.log('response ok');
            const data = await response.json();
            if (!data.length) return;

            console.log('table length ok. data: ' + Object.entries(data));

            getTable.classList.remove('hidden');
            data.forEach(item => appendTableRow(item));

        } else {
            throw new Error('failed to fetch data');
        }

    } catch(err) {
        console.log('error: ' + err);
    }
}

/**
 * Appends a new row to the table body for each item fetched.
 * @param {Object} item - The item to append to the table.
 */
function appendTableRow(item) {
    console.log('appendElement called for: ' + Object.entries(item));
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
        <tr class="get-row">
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td><button type="button" class="delete-button">Delete</button></td>
            <td><button type="button" class="edit-button">Edit</button></td>
        </tr>`;
    tableBody.appendChild(tableRow);

    activateDeleteButton(tableRow, item);
    activateEditButton(tableRow, item);
}

/**
 * Activates the edit button for a given table row.
 * @param {HTMLElement} tableRow - The table row element.
 * @param {Object} item - The item associated with the row.
 */
function activateEditButton(tableRow, item) {
    const editButton = tableRow.querySelector('.edit-button');
    editButton.addEventListener('click', () => initializeUpdateForm(item));
}

/**
 * Initializes the update form with the selected item's data.
 * @param {Object} item - The item to be updated.
 */
function initializeUpdateForm(item) {
    const updateForm = document.getElementById('update-form');
    updateForm.classList.remove('hidden');

    currentItem.value = item;
}

export { handleGet, currentItem };
