const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false
})

// Test the connection
pool.on('connect', () => {
    console.log('✓ Connected to the database');
});

pool.on('error', (err) => {
    console.error('Database connection error:', err);
});

module.exports = pool