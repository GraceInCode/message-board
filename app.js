require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const pool = require('./database/db')
const indexRouter = require('./routes/index');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up EJS layouts
app.use(expressLayouts);
app.set('layout', 'layout');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Database initialization function
async function initializeDatabase() {
    try {
        console.log('Connecting to the database...');
        const client = await pool.connect();

        // Check if the messages table exists
        const checkResult = await client.query(
            "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'messages')"
        );

        if (!checkResult.rows[0].exists) {
            console.log('Creating messages table...');
            // Read and execute SQL file
            const sqlFile = fs.readFileSync(path.join(__dirname, 'database', 'init.sql'), 'utf8');
            await client.query(sqlFile);
            console.log('Messages table created successfully.');
        } else {
            console.log('Messages table already exists.');
        }

        client.release();
} catch (error) {
        console.error('Error initializing database:', error);
  }
}


// Routes
app.use('/', indexRouter);

// Initialize the database
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to initialize database:', error);
    // Start server anyway
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} despite database initialization failure.`);
    });
})
