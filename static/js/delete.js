/**
 * Attaches an event listener to the delete button within a table row.
 * When the button is clicked, the row is removed from the table, and the
 * corresponding data is deleted by calling the `deleteData` function.
 * @param {HTMLElement} tableRow - The table row element containing the delete button.
 * @param {Object} item - The data item associated with the row, used to identify which data to delete.
 */
function activateDeleteButton(tableRow, item) {
    const tableBody = document.getElementById('table-body');
    const button = tableRow.querySelector('button.delete-button');
    
    button.addEventListener('click', () => {
        // Removes the datarow from DOM before sending DELETE request to avaoid an extra GET request.
        tableBody.removeChild(tableRow);
        deleteData(item);
    });
}

/**
 * Sends a DELETE request to the server to delete the specified item.
 * The function assumes that the item object contains an ID property, which
 * is used to construct the request URL.
 * @async
 * @param {Object} item - The item to be deleted, must contain an ID property.
 * @returns {Promise<void>} - The function is asynchronous but does not explicitly return a value.
 */
async function deleteData(item) {
    try {
        const response = await fetch(`delete_data/${item.ID}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error('response not ok');
        }
    } catch(err) {
        console.log(err);
    }
}

export { activateDeleteButton };
