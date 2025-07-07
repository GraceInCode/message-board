require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const pool = require('./database/db');
const indexRouter = require('./routes/index');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

// Debug: Check if DATABASE_URL is available
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

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
        console.log('=== DATABASE INITIALIZATION START ===');
        console.log('Attempting to connect to database...');
        
        const client = await pool.connect();
        console.log('✓ Database connection successful');
        
        // Check if messages table exists
        const checkResult = await client.query(
            "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'messages')"
        );
        
        console.log('Messages table exists:', checkResult.rows[0].exists);
        
        if (!checkResult.rows[0].exists) {
            console.log('Creating messages table...');
            // Read and execute SQL file
            const sqlFile = fs.readFileSync(path.join(__dirname, 'database', 'init.sql'), 'utf8');
            await client.query(sqlFile);
            console.log('✓ Database initialized successfully');
        } else {
            console.log('✓ Messages table already exists');
        }
        
        // Test query
        const testResult = await client.query('SELECT COUNT(*) FROM messages');
        console.log('Current message count:', testResult.rows[0].count);
        
        client.release();
        console.log('=== DATABASE INITIALIZATION COMPLETE ===');
    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
        console.error('Full error:', error);
        // Don't exit the process, let the app continue
    }
}

// Routes
app.use('/', indexRouter);

// Initialize database and start server
console.log('Starting application...');
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`✓ Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('❌ Failed to initialize database:', error);
    // Start server anyway
    app.listen(PORT, () => {
        console.log(`⚠️  Server is running on port ${PORT} (database may not be initialized)`);
    });
});