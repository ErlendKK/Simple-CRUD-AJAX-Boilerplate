/**
 * Entry point script for the application.
 * Sets up event listeners for document readiness, form submissions, and item updates.
 */

import { handleGet, currentItem } from "./js/get.js";
import { handleSubmit } from "./js/post.js";
import { activateDeleteButton } from "./js/delete.js";
import { handleUpdate } from "./js/update.js";


// Sets up the initial data load and configures event listeners for user interactions.
document.addEventListener("DOMContentLoaded", () => {
    // Fetches data and populates the table
    handleGet();

    // Configures the submit button for new data entries
    document.getElementById('post-button').addEventListener('click', handleSubmit);

    // Configures the update button to update the current item
    document.getElementById('update-button').addEventListener('click', () => {
        if (currentItem.value) {
            handleUpdate(currentItem.value);
        }
    });
});
