const express = require('express');
const router = express.Router();

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

// Index route - show all messages

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Mini Message Board',
        messages: messages
    });
});

// New message form route
router.get('/message/:id', (req, res) => {
    const messageId = parseInt(req.params.id);
    const message = messages[messageId]

    if (message) {
        res.render('message-details', {
            title: 'Message Details',
            message: message,
            messageId: messageId
        })
    } else {
        res.status(404).render('error', {
            title: 'Not Found',
            error: 'Message not found'
        })
    }
})

router.get('/new', (req, res) => {
    res.render('form', {
        title: 'New Message'
    })
})

router.post('/new', (req, res) => {
    const { messageUser, messageText } = req.body;

    if (messageUser && messageText) {
        messages.push({
            user: messageUser,
            text: messageText,
            added: new Date()
        })
    }

    res.redirect('/');
})

module.exports = router;