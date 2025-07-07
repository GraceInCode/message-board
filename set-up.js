require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

async function setUpDatabase() {
    try {
        console.log('Connecting to the database...');
        const client = await pool.connect();
        console.log('Database connection successful');

        // Read and execute SQL file
        const sqlFile = fs.readFileSync(path.join(__dirname, 'database', 'init.sql'), 'utf8');
        console.log('Executing SQL file...');
        await client.query(sqlFile);
        console.log('SQL file executed successfully');

        // check if messages table exists
        const checkResult = await client.query(
            "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'messages')"
        );
        console.log('Messages table exists:', checkResult.rows[0].exists);
        // verify the setup
        const result = await client.query('SELECT * FROM messages');
        console.log(`Messages table has ${result.rows.length} entries.`);

        client.release();
        process.exit(0);
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}
setUpDatabase();