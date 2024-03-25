import sqlite3

DATA = './users.sqlite'

def validate(data):
    """
    Validates the input data by ensuring all values are either integers or strings
    containing only alphanumeric characters, spaces, hyphens, or apostrophes.

    Parameters:
    - data (dict): The data dictionary to validate.

    Returns:
    - bool: True if data is valid, False otherwise.
    """
    for value in data.values():
        if isinstance(value, int):
            continue
        
        if not all(char.isalnum() or char in [" ", "-", "'"] for char in value):
            return False
    return True

def get_db_data(id=None):
    """
    Fetches user data from the database. Can retrieve either all users or a specific user by ID.

    Parameters:
    - id (int, optional): The ID of the user to retrieve. If None, all users are retrieved.

    Returns:
    - dict: A dictionary containing a success flag, and either the data fetched or an error message.
    """
    try:
        conn = sqlite3.connect(DATA)
        cursor = conn.cursor()

        if id is None:
            cursor.execute("SELECT * FROM users")
            rows = cursor.fetchall()
            data = [{"ID": row[0], "name": row[1], "age": row[2]} for row in rows]
        else:
            cursor.execute("SELECT * FROM users WHERE ID = ?", (id,))
            row = cursor.fetchone()
            data = [{"ID": row[0], "name": row[1], "age": row[2]}] if row else []

        conn.close()
        return {"success": True, "data": data}
    
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return {"success": False, "message": "Database error occurred"}

def post_db_data(data):
    """
    Inserts new user data into the database.

    Parameters:
    - data (dict): A dictionary containing the 'name' and 'age' of the user to add.

    Returns:
    - str: An empty string on success, or "error" on failure.
    """
    try:
        conn = sqlite3.connect(DATA)
        cursor = conn.cursor()
        
        sql = "INSERT INTO users (name, age) VALUES (?, ?)"
        cursor.execute(sql, (data['name'], data['age']))
        conn.commit()  
        conn.close()
        return ""
    
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return "error"

def update_db_data(data):
    """
    Updates existing user data in the database.

    Parameters:
    - data (dict): A dictionary containing the 'ID', 'name', and 'age' of the user to update.

    Returns:
    - str: An empty string if the update was successful, or "error" if the update failed.
    """
    try:
        conn = sqlite3.connect(DATA)
        cursor = conn.cursor()

        sql = "UPDATE users SET name = ?, age = ? WHERE ID = ?"
        cursor.execute(sql, (data['name'], data['age'], data['ID']))

        conn.commit()
        conn.close()

        if cursor.rowcount == 0:
            return "error"

        return ""

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return "error"