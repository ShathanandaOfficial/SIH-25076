const mongoose = require('mongoose');
const Logger = require('../utils/logger');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        Logger.info(`MongoDB Connected: ${conn.connection.host}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            Logger.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            Logger.warn('MongoDB disconnected');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                Logger.info('MongoDB connection closed through app termination');
                process.exit(0);
            } catch (err) {
                Logger.error('Error closing MongoDB connection:', err);
                process.exit(1);
            }
        });

    } catch (error) {
        Logger.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;