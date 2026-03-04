const mysql = require('mysql2/promise');
require('dotenv').config(); // Load từ file .env hiện tại trong thư mục server

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sla_rbt_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
pool.getConnection()
    .then(connection => {
        console.log('✅ Connected to MySQL Database!');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Error connecting to MySQL:', err.message);
    });

module.exports = pool;
