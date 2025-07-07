const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Index route - show all messages

router.get('/', async (req, res) => {
    try {
        const messages = await userController.getAllMessages()
        res.render('index', {
            title: 'Mini Message Board',
            messages: messages
        })
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: 'Could not fetch messages'
        });
    }
})

// Show individual message by ID
router.get('/message/:id', async (req, res) => {
    const messageId = parseInt(req.params.id);
    try {
        const message = await userController.getMessagesById(messageId);
        if (message) {
            res.render('message-details', {
                title: 'Message Details',
                message: message,
                messageId: messageId
            });
        } else {
            res.status(404).render('error', {
                title: 'Not Found',
                error: 'Message not found'
            });
        }
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: 'Could not fetch message'
        });
    }
});


// New message form
router.get('/new', (req, res) => {
    res.render('form', {
        title: 'New Message'
    })
})

// add new message
router.post('/new', async (req, res) => {
    const { messageUser, messageText } = req.body;
    if (messageUser && messageText) {
        try {
            await userController.addMessage(messageText, messageUser);
            res.redirect('/');
        } catch (error) {
            console.error('Error adding message:', error);
            res.status(500).render('error', {
                title: 'Error',
                error: 'Could not add message'
            });
        }
    } else {
        res.status(400).render('error', {
            title: 'Bad Request',
            error: 'Message user and text are required'
        });
    }
})

module.exports = router;