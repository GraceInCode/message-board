CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    username VARCHAR(50) NOT NULL,
    added TIMESTAMP NOT NULL
);

INSERT INTO messages (content, username, added) VALUES
('Hello, world!', 'user1', NOW()),
('This is a test message.', 'user2', NOW()),
('Another message for the board.', 'user3', NOW());