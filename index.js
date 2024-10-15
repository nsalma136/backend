const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'userDB' // Ensure this matches your MySQL database
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL Connected...');
});

// Health check route
app.get('/', (req, res) => {
    res.send('API is up and running!');
});

// Test route to insert dummy data into the database
app.get('/test', (req, res) => {
    const query = "INSERT INTO users (name, age, sex, city, state) VALUES ('John Doe', 30, 'Male', 'New York', 'NY')";
    
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error');
        }
        res.send('Test User added!');
    });
});

// Existing POST route to insert data from the frontend form
app.post('/adduser', (req, res) => {
    console.log('Received data:', req.body); // Check what data is received

    const { name, age, sex, city, state } = req.body;
    const query = `INSERT INTO users (name, age, sex, city, state) VALUES (?, ?, ?, ?, ?)`;
    
    db.query(query, [name, age, sex, city, state], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error inserting data');
        }
        res.send('User added!');
    });
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
