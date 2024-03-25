import { handleGet, currentItem } from "./get.js"

/**
 * Handles the update operation for an item.
 * Sends a PUT request to the 'update_data' endpoint with the updated item data.
 * Upon successful update, hides the update form and refreshes the displayed data.
 * @async
 * @function handleUpdate
 * @param {Object} item - The item to be updated.
 */
async function handleUpdate(item) {
    console.log('handleUpdate: ' + Object.keys(item));
    const data = jsonifyInput(item);

    try {
        const response = await fetch('update_data',  {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        if (!response.ok) {
            throw new Error('response not ok');
        }

        const text = await response.text();
        console.log(text);

        // Hides the update form, reset item to be updated, and refreshes the table
        document.getElementById('update-form').classList.add('hidden');
        currentItem.value = null; // 
        handleGet(); 

    } catch(err) {
        console.log(err);
    }
}

/**
 * Converts the updated item data into a JSON string for the PUT request payload.
 * If the new name or age is not provided, they are set to null in the JSON.
 * @function jsonifyInput
 * @param {Object} item - The original item being updated, containing at least an ID.
 * @returns {string} - A JSON string representing the updated item data.
 */
function jsonifyInput(item) {
    console.log('jsonifyInput: ' + item.ID);
    let newName = document.getElementById('edit-name').value;
    let newAge = document.getElementById('edit-age').value;

    // Default to null if the new values are empty strings
    if (newName === "") newName = null;
    if (newAge === "") newAge = null;

    return JSON.stringify({name: newName, age: newAge, ID: item.ID});
}

export { handleUpdate }
