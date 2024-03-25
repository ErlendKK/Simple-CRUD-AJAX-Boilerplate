import { handleGet } from "./get.js"

/**
 * Handles the submission of the form data to the server.
 * Validates the input fields before sending a POST request with the form data.
 * Displays the result of the submission and refreshes the data displayed on the page.
 * @async
 * @function handleSubmit
 */
export async function handleSubmit() {
    /** @type {HTMLElement} */
    const result = document.getElementById('post-result');
    const name = document.getElementById('input-name').value;
    const age = document.getElementById('input-age').value;

    // Checks for missing input values
    if (!age || !name) {
        result.textContent = 'Input missing';
        result.classList.remove('hidden');
        return;
    }

    try {
        // Attempts to send the form data to the server
        const response = await fetch('/submit_data', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({name: name, age: age})
        });

        if (response.ok) {
            const responseBody = await response.text();

            if (responseBody === 'error') {
                throw new Error('non-valid input');
            }

            // Informs that the submission was successful and refreshes the table
            result.textContent = 'submission successful.';
            result.classList.remove('hidden');
            handleGet();
        }

    } catch(err) {
        result.textContent = 'error: ' + err;
    }

    // Clears the result text after a delay
    setTimeout(() => {
        result.textContent = "";
        result.classList.add('hidden');
    }, 2500);
}
