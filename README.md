
# Mini Message Board

A simple web application built with Node.js, Express, and EJS, serving as a mini message board where users can post messages and view them.

## Features

View Messages: Display a list of all submitted messages on the homepage

Add New Message: A dedicated form to submit new messages, including the user's name and message text.

Message Details: Click on a message to view its full details on a separate page.

Date and Time Stamping: Each message automatically records the date and time it was added.

Error Handling: Basic 404 error page for non-existent message IDs.

Templating: Uses EJS for dynamic HTML rendering with a shared layout for consistent UI.

Styling: Basic CSS for a clean and readable user interface.

## Technologies Used

Node.js: JavaScript runtime environment.

Express.js: Fast, unopinionated, minimalist web framework for Node.js.

EJS (Embedded JavaScript templates): Simple templating language for generating HTML markup with plain JavaScript.

Nodemon: A tool that helps develop Node.js based applications by automatically restarting the node application.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Node.js (LTS version recommended)

npm (comes with Node.js)

### Installation

Clone the repository:

``
git clone [https://github.com/YOUR_USERNAME/mini-message-board.git](https://github.com/YOUR_USERNAME/mini-message-board.git)
cd mini-message-board
Install dependencies:
``

``
npm install
``

Running the Application
Development Mode (with Nodemon):

``
npm run dev
``

This will start the server using nodemon, which automatically reloads the application when you make changes to your code.

Production Mode:

``
npm start
``

This will start the server using plain Node.js.

Once the server is running, open your web browser and navigate to:
[http://localhost:3000](http://localhost:3000)

Contributing
Feel free to fork the repository, create a feature branch, and send us a pull request!

License
This project is licensed under the MIT License - see the LICENSE.md file (if you create one) for details.
