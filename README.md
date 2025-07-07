# Mini Message Board

A simple, clean message board application built with Node.js, Express, and PostgreSQL. Users can post messages, view all messages, and see detailed views of individual messages.

## Features

- 📝 Post new messages with username and content
- 📋 View all messages in chronological order (newest first)
- 🔍 View detailed information for individual messages
- 🎨 Clean, responsive design
- 🗄️ PostgreSQL database integration
- ⚡ Server-side rendering with EJS templates

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Templating:** EJS with express-ejs-layouts
- **Styling:** CSS3
- **Development:** Nodemon for hot reloading

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

**Clone the repository:**

``
git clone <repository-url>
cd mini-messageboard
``

**Install dependencies:**

``
npm install
``

**Set up environment variables:**
Create a `.env` file in the root directory and add your database connection string:
``env
DATABASE_URL=postgresql:/username:password@localhost:5432/your_database_name
PORT=3000
``

**Set up the database:**
Run the database setup script to create the necessary tables and seed data:
``
node set-up.js
``

## Usage

### Development Mode

``
npm run dev
``
This will start the server with nodemon for automatic restarts on file changes.

### Production Mode

``
npm start
``

The application will be available at `http://localhost:3000` (or your specified PORT).

## Database Schema

The application uses a simple `messages` table with the following structure:

``sql
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    username VARCHAR(50) NOT NULL,
    added TIMESTAMP NOT NULL
);
``

## API Endpoints

- `GET /` - Display all messages
- `GET /new` - Show new message form
- `POST /new` - Create a new message
- `GET /message/:id` - Display individual message details

## Features in Detail

### Message Display

- Messages are displayed in reverse chronological order (newest first)
- Each message shows the username, timestamp, and content
- Click "Open" to view detailed information about a specific message

### Adding Messages

- Simple form with username and message content fields
- Both fields are required
- After submission, users are redirected to the main page

### Error Handling

- Graceful error handling for database operations
- User-friendly error messages
- 404 handling for non-existent messages

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Port number for the server | 3000 |

## Development

### Database Setup

The `set-up.js` script will:

- Create the `messages` table if it doesn't exist
- Insert sample data
- Verify the database connection and setup

### Adding New Features

- Controllers are in `/controllers/` - add database operations here
- Routes are in `/routes/` - add new endpoints here
- Views are in `/views/` - add new templates here
- Static files go in `/public/`

## Deployment

### Heroku

1. Create a new Heroku app
2. Add the Heroku PostgreSQL add-on
3. Set your environment variables in Heroku dashboard
4. Deploy your code
5. Run the database setup: `heroku run node set-up.js`

### Other Platforms

Ensure you have:

- A PostgreSQL database instance
- Environment variables properly configured
- Run the database setup script after deployment

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please create an issue in the repository.
