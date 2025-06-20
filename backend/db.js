require('dotenv').config();
const mysql = require('mysql2');

// Create a pool for robust, auto-reconnecting queries
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,   // Tweak as needed
  queueLimit: 0
});

// Optional: check DB connection ONCE at startup (not required for every query)
pool.query('SELECT 1', (err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL RDS');
  }
});

module.exports = pool;
