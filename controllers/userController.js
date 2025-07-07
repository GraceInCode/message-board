const pool = require('../database/db');

async function getAllMessages() {
    const result = await pool.query('SELECT * FROM messages ORDER BY added DESC');
    return result.rows;
}

async function getMessagesById(id) {
    const result = await pool.query('SELECT * FROM messages WHERE id = $1', [id]);
    return result.rows[0];
}

async function addMessage(content, username) {
    const result = await pool.query(
        'INSERT INTO messages (content, username, added) VALUES ($1, $2, NOW()) RETURNING id',
        [content, username]
    )
    return result.rows[0].id;
}

module.exports = {
    getAllMessages,
    getMessagesById,
    addMessage
}