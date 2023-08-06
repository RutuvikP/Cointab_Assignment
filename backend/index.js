// index.js
const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())

// MySQL Connection Configuration
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// API Endpoints
app.get('/fetchUsers', async (req, res) => {
  try {
    const response = await axios.get('https://randomuser.me/api/?results=50');
    const users = response.data.results;
    const insertQuery = 'INSERT INTO users (firstName, lastName, email, phone, image) VALUES ?';

    const values = users.map((user) => [
      user.name.first,
      user.name.last,
      user.email,
      user.phone,
      user.picture.medium
    ]);

    connection.query(insertQuery, [values], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error inserting users into database' });
      }

      return res.json({ message: 'Users inserted successfully' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching users from API' });
  }
});

app.get('/deleteUsers', (req, res) => {
  const deleteQuery = 'DELETE FROM users';

  connection.query(deleteQuery, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting users from database' });
    }

    return res.json({ message: 'All users deleted successfully' });
  });
});

app.get('/userDetails', (req, res) => {
  const selectQuery = 'SELECT * FROM users';

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching user details from database' });
    }

    return res.json({ users: results });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
