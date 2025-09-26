const express = require('express');
const router = express.Router();

// Import route modules
const chatRoutes = require('./chat');
const escalationRoutes = require('./escalation');
const imageRoutes = require('./images');
const userRoutes = require('./users');
const weatherRoutes = require('./weather');
const cropRoutes = require('./crops');
const pestRoutes = require('./pests');
const diseaseRoutes = require('./diseases');
const schemeRoutes = require('./schemes');

// Mount route modules
router.use('/chat', chatRoutes);
router.use('/escalation', escalationRoutes);
router.use('/images', imageRoutes);
router.use('/users', userRoutes);
router.use('/weather', weatherRoutes);
router.use('/crops', cropRoutes);
router.use('/pests', pestRoutes);
router.use('/diseases', diseaseRoutes);
router.use('/schemes', schemeRoutes);

// Health check route
router.get('/health', (req, res) => {
    res.json({ 
        message: 'API is healthy',
        timestamp: new Date().toISOString(),
        status: 'OK'
    });
});

module.exports = router;