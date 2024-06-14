const colors = require("colors");
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'waiver_cal'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return; // Exit the function early if there's an error
  }
  console.log('DB connection is successful'.bgCyan.white);
});

connection.on('error', (err) => {
  console.error('Database error:', err);
  // You might want to handle the error or reconnect here
});

module.exports = connection;
