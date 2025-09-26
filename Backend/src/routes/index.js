const express = require('express');
const router = express.Router();

// Import route modules
const chatRoutes = require('./chat');
const escalationRoutes = require('./escalation');
const imageRoutes = require('./images');
const userRoutes = require('./users');

// Mount route modules
router.use('/chat', chatRoutes);
router.use('/escalation', escalationRoutes);
router.use('/images', imageRoutes);
router.use('/users', userRoutes);

// Health check route
router.get('/health', (req, res) => {
    res.json({ 
        message: 'API is healthy',
        timestamp: new Date().toISOString(),
        status: 'OK'
    });
});

module.exports = router;