const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');
const cors = require('cors');

// Create an instance of the express application
const app = express();

// Let's be unsecured here too.
app.use(cors({
    origin: '*', // Replace with your React app's URL
    methods: ['GET', 'POST'], // Adjust the allowed methods if necessary
    credentials: true, // If you need to include cookies in the requests
  }));

// Use JSON middleware to parse JSON bodies
app.use(express.json());

// Connect to SQLite database (or create it)
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');

        // Create table if it doesn't exist
        db.run(
            `CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_datetime TEXT NOT NULL,
            question TEXT NOT NULL,
            sql_statement TEXT NOT NULL,
            error_message TEXT
   )`
        );
    }
});

// Endpoint to store event information
app.post('/events', (req, res) => {
    const { question_datetime, question, sql_statement, error_message } = req.body;

    // Positively confirm the format is ISO-8601, UTC.
    const isoDatetime = new Date(question_datetime).toISOString();

    // Insert data into the events table
    const stmt = db.prepare(
        'INSERT INTO events (question_datetime, question, sql_statement, error_message) VALUES (?, ?, ?, ?)'
    );

    stmt.run(isoDatetime, question, sql_statement, error_message, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });

    stmt.finalize();
});

// Endpoint to get the latest 20 records in ascending order
app.get('/events/latest', (req, res) => {
    const sqlQuery = `SELECT * FROM events ORDER BY question_datetime DESC LIMIT 20`;

    db.all(sqlQuery, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        // Reverse order to ascending before sending response
        const orderedRows = rows.reverse();
        res.json(orderedRows);
    });
});

app.get('/events/latest', (req, res) => {
    const sqlQuery = `SELECT * FROM events ORDER BY question_datetime DESC LIMIT 20`;

    db.all(sqlQuery, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        // Convert the question_datetime field to a Date object
        const transformedRows = rows.map(row => {
            return {
                question_datetime: new Date(row.question_datetime),
                id: row.id,
                question: row.question,
                sql_statement: row.sql_statement,
                error_message: row.error_message
            };
        });

        // Reverse order to ascending before sending response
        const orderedRows = transformedRows.reverse();
        res.json(orderedRows);
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});