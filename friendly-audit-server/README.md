# Friendly Audit Server

This project is a simple node server using Express and SQLite to log and retrieve event information. It provides a way to store event details in a local SQLite database and offers an API endpoint to fetch the most recent entries.

## Features

- Accepts event information: `question_datetime`, `question`, `sql_statement`, and `error_message` (nullable).
- Stores event data in a SQLite database.
- Indexes entries by `question_datetime` in descending order for efficient retrieval.
- API endpoint to fetch the latest 20 event records, reordered to ascending order for easy reading.

## Requirements

- Node.js (v12 or higher)
- SQLite3

## Getting Started

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/christophercoy/friendly-audit-server.git
   cd friendly-audit-server
   ```

2. **Install Dependencies**:
   ```sh
   npm install
   ```

3. **Run the Server**:
   ```sh
   node server.js
   ```

### Usage

- **Storing Event Information**:
  - Send a POST request to the server with JSON payload including the `question_datetime`, `question`, `sql_statement`, and optionally an `error_message`.

- **Fetching Recent Events**:
  - Use the GET endpoint to retrieve the latest 20 records. The server automatically reorders these records in ascending order by `question_datetime`.

### API Endpoints

#### POST `/events`

- **Description**: Stores event information into the database.

- **Request Body**:
  ```json
  {
    "question_datetime": "2023-10-05T14:48:00.000Z",
    "question": "What is the average age?",
    "sql_statement": "SELECT AVG(age) FROM users",
    "error_message": "Column not found"
  }
  ```

#### GET `/events/recent`

- **Description**: Retrieves the 20 most recent event records ordered by `question_datetime` in ascending order.

- **Response**:
  ```json
  [
    {
      "question_datetime": "2023-10-05T13:00:00.000Z",
      "question": "How many users?",
      "sql_statement": "SELECT COUNT(*) FROM users",
      "error_message": null
    },
    ...
  ]
  ```

## Database Schema

The SQLite database consists of a single table to store event logs:

- **Table Name**: `events`
- **Columns**:
  - `id` INTEGER PRIMARY KEY AUTOINCREMENT
  - `question_datetime` DATETIME NOT NULL
  - `question` TEXT NOT NULL
  - `sql_statement` TEXT NOT NULL
  - `error_message` TEXT