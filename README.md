# Simple CRUD/AJAX Boilerplate

This repository contains a simple CRUD (Create, Read, Update, Delete) application boilerplate using Vanilla JavaScript for the frontend, Flask for the backend, and SQLite for the database. It's designed to apply basic CRUD operations through AJAX calls.

## Features

- **Create**: Add new entries to the database through a simple form.
- **Read**: View all entries stored in the database.
- **Update**: Modify existing entries.
- **Delete**: Remove entries from the database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Python 3
- pip (Python package manager)
- Flask

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ErlendKK/simple-crud-ajax-boilerplate
   cd simple-crud-ajax-boilerplate
   ```

2. **Set up a virtual environment** (optional but recommended)

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\\Scripts\\activate`
   ```

3. **Initialize the database**

   Before running the application for the first time, you need to create the SQLite database
   The `init_db.sql` contains the SQL commands to create an example `users` table with `ID`, `name`, and `age` columns, and optional initial data.

### Running the Application

To start the Flask application, run:

```bash
flask run
```

By default, the application will be accessible at `http://127.0.0.1:5000`.

## Usage

Once the application is running, you can perform CRUD operations through the web interface:

- **Create**: Use the form provided on the main page to add new entries.
- **Read**: Upon loading the main page, existing entries will be displayed.
- **Update/Delete**: Each entry will have associated \Edit\ and \Delete\ buttons to modify or remove the entry, respectively.

## Structure

- `app.py`: The Flask application.
- `utils.py`: Utility functions for database operations.
- `/static`: HTML CSS and JavaScript files.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License
