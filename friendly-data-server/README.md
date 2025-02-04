# Friendly Data Server

The Friendly Data Server is a Node.js application that integrates with both Slack and OpenAI to process questions, generate SQL queries, and query a PostgreSQL database. The server can respond to HTTP requests and Slack events.

## Features

- **Slack Integration**: Responds to mentions in Slack channels with data retrieved from a PostgreSQL database.
- **OpenAI Integration**: Uses OpenAI's GPT-4 to generate SQL queries based on user questions.
- **PostgreSQL**: Queries a PostgreSQL database and returns results.
- **Event Auditing**: Logs queries and results for auditing purposes.

## Prerequisites

- Node.js
- PostgreSQL
- An OpenAI API Key
- A Slack Bot and signing secret

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/christophercoy/friendly-data-server.git
    cd friendly-data-server
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Environment Configuration**:
    Create a `.env` file in the root directory and configure it with the following variables:
    ```plaintext
    PORT=YOUR_DESIRED_PORT
    DB_USER=YOUR_POSTGRESQL_USERNAME
    DB_HOST=YOUR_POSTGRESQL_HOST
    DB_DATABASE=YOUR_POSTGRESQL_DATABASE
    DB_PASSWORD=YOUR_POSTGRESQL_PASSWORD
    DB_PORT=YOUR_POSTGRESQL_PORT
    OPENAI_API_KEY=YOUR_OPENAI_API_KEY
    SLACK_SIGNING_SECRET=YOUR_SLACK_SIGNING_SECRET
    SLACK_BOT_TOKEN=YOUR_SLACK_BOT_TOKEN
    AUDIT_SERVER_BASE_URL=YOUR_AUDIT_SERVER_BASE_URL
    ```

4. **Create Prompt**:
    Ensure you have a `prompt.txt` file that contains the initial prompt to be used by OpenAI.

## Usage

1. **Start the server**:
    ```bash
    node server.js
    ```

2. **Slack Integration**:
    - Ensure your Slack bot is installed in the desired workspace.
    - The server listens for Slack events and will reply when your bot user is mentioned.

3. **HTTP API**:
    - Send a POST request to the `/ask` endpoint with a JSON payload containing the `question` key:
    ```json
    {
      "question": "Your query question here"
    }
    ```

## API Endpoints

- **POST `/ask`**:
    - Process a question and returns the results from the database.

## Slack Integration

- Listens for `app_mention` events on Slack and responds with relevant data from the database.