const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const compression = require('compression');

// Import configurations and utilities
const config = require('./config');
const connectDB = require('./config/database');
const Logger = require('./utils/logger');

// Import middlewares
const { errorHandler, notFound } = require('./middlewares/errorHandler');

// Import routes
const routes = require('./routes');

// Import jobs
const QueryCleanupJob = require('./jobs/queryCleanup');
const NotificationJob = require('./jobs/notifications');

class App {
    constructor() {
        this.app = express();
        this.initializeDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
        this.initializeJobs();
    }

    async initializeDatabase() {
        await connectDB();
    }

    initializeMiddlewares() {
        // Security middleware
        this.app.use(helmet());
        
        // CORS configuration
        this.app.use(cors(config.cors));
        
        // Rate limiting
        const limiter = rateLimit(config.rateLimit);
        this.app.use('/api/', limiter);
        
        // Compression
        this.app.use(compression());
        
        // Body parsing
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
        
        // Logging
        if (config.nodeEnv === 'development') {
            this.app.use(morgan('dev'));
        } else {
            this.app.use(morgan('combined'));
        }
        
        // Static files
        this.app.use('/uploads', express.static(config.upload.uploadDir));
        
        Logger.info('Middlewares initialized');
    }

    initializeRoutes() {
        // Health check endpoint
        this.app.get('/health', (req, res) => {
            res.json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                environment: config.nodeEnv
            });
        });

        // API routes
        this.app.use('/api', routes);
        
        Logger.info('Routes initialized');
    }

    initializeErrorHandling() {
        // 404 handler
        this.app.use(notFound);
        
        // Global error handler
        this.app.use(errorHandler);
        
        Logger.info('Error handling initialized');
    }

    initializeJobs() {
        if (config.nodeEnv === 'production') {
            QueryCleanupJob.start();
            NotificationJob.start();
            Logger.info('Background jobs initialized');
        }
    }

    getApp() {
        return this.app;
    }
}

module.exports = App;