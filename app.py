from utils import DATA, validate, get_db_data, post_db_data, update_db_data
from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

@app.route("/")
def index():
    """
    Serves the index.html file to the client.

    Returns:
    - The static index.html file on success, or raises an exception on failure.
    """
    try:
        return app.send_static_file("index.html")
    except Exception as e:
        print(f"Error serving index.html: {e}")
        raise

@app.route('/get_data')
def get_data():
    """
    Endpoint to retrieve data from the database.

    Returns:
    - JSON response containing the data on success, or a success flag on failure.
    """
    result = get_db_data()

    if result["success"]:
        return jsonify(result['data'])
    else:
        return jsonify(result['success'])

@app.route('/submit_data', methods=["POST"])
def submit_data():
    """
    Endpoint to submit new data to the database.

    Returns:
    - A response indicating the outcome of the data submission.
    """
    data = request.get_json()

    if not validate(data):
        return "error"

    return post_db_data(data)

@app.route('/delete_data/<int:id>', methods=["DELETE"])
def delete_data(id):
    """
    Endpoint to delete data from the database based on a given ID.

    Parameters:
    - id (int): The ID of the data to delete.

    Returns:
    - An empty response on success, or "error" on failure.
    """
    try:
        conn = sqlite3.connect(DATA)
        cursor = conn.cursor()
        cursor.execute("DELETE FROM users WHERE ID = ?", (id,))
        conn.commit()
        
        if cursor.rowcount == 0:
            conn.close()
            return "error"
        
        conn.close()
        return ""
    
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return "error"

@app.route('/update_data', methods=["PUT"])
def update_data():
    """
    Endpoint to update existing data in the database.

    Returns:
    - A response indicating the outcome of the update operation.
    """
    data = request.get_json()   
    existing_data_list = get_db_data(data['ID'])
    existing_data = existing_data_list["data"][0]

    for key in data.keys():
        if data[key] is None:
            data[key] = existing_data[key]

    if not validate(data):
        return "error"

    return update_db_data(data)

if __name__ == "__main__":
    app.run(debug=True)
