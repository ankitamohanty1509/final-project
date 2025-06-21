require('dotenv').config();
const mysql = require('mysql2');

// First, connect WITHOUT the DB to create it if needed
const basePool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0
});

const dbName = process.env.DB_NAME;

// Step 1: Ensure database exists
basePool.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
  if (err) {
    console.error('❌ Failed to create DB:', err);
    process.exit(1);
  } else {
    console.log(`✅ Database '${dbName}' ready`);

    // Step 2: Now create a pool WITH the DB
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Step 3: Ensure table exists
    const tableSql = `
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        quantity INT
      )
    `;
    pool.query(tableSql, (err) => {
      if (err) {
        console.error('❌ Failed to create table:', err);
        process.exit(1);
      } else {
        console.log('✅ Table "items" ready');
      }
    });

    // Export the pool for use in your routes
    module.exports = pool;
  }
});
