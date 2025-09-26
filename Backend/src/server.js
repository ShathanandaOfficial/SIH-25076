const App = require('./main');
const config = require('./config');
const Logger = require('./utils/logger');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    Logger.error('Uncaught Exception:', err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    Logger.error('Unhandled Rejection:', err);
    process.exit(1);
});

// Initialize app
const app = new App();
const server = app.getApp();

// Start server
const PORT = config.port;
const HOST = config.host;

server.listen(PORT, HOST, () => {
    Logger.info(`🚀 Server running on http://${HOST}:${PORT}`);
    Logger.info(`📱 Environment: ${config.nodeEnv}`);
    Logger.info(`🗄️  Database: ${config.mongodb.uri}`);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
    Logger.info(`${signal} received. Starting graceful shutdown...`);
    
    server.close((err) => {
        if (err) {
            Logger.error('Error during server shutdown:', err);
            process.exit(1);
        }
        
        Logger.info('Server closed successfully');
        process.exit(0);
    });
    
    // Force shutdown after 10 seconds
    setTimeout(() => {
        Logger.error('Forced shutdown due to timeout');
        process.exit(1);
    }, 10000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = server;