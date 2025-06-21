require('dotenv').config();
const mysql = require('mysql2');

const dbName = process.env.DB_NAME;

// Step 1: Pool WITHOUT database for initial creation
const basePool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0
});

// Step 2: Create database if not exists, THEN table
basePool.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
  if (err) {
    console.error('❌ Failed to create DB:', err);
    process.exit(1);
  } else {
    console.log(`✅ Database '${dbName}' ready`);

    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Create table
    pool.query(
      `CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        quantity INT
      )`, (err) => {
        if (err) {
          console.error('❌ Table creation failed:', err);
          process.exit(1);
        } else {
          console.log('✅ Table "items" ready');
        }
      }
    );

    // Export this pool for the rest of the app
    module.exports = pool;
  }
});

// In case anything tries to import before pool is ready
module.exports = basePool;
