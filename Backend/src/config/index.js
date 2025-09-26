require('dotenv').config();

const config = {
    // Server configuration
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    nodeEnv: process.env.NODE_ENV || 'development',

    // Database configuration
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/farming-advisory',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },

    // JWT configuration
    jwt: {
        secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key'
    },

    // CORS configuration
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true
    },

    // File upload configuration
    upload: {
        maxFileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        uploadDir: process.env.UPLOAD_DIR || 'uploads/'
    },

    // Rate limiting
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: process.env.RATE_LIMIT_MAX || 100 // limit each IP to 100 requests per windowMs
    },

    // Email service configuration (if needed)
    email: {
        service: process.env.EMAIL_SERVICE || 'gmail',
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD
    },

    // External API keys (if needed)
    apis: {
        weatherApi: process.env.WEATHER_API_KEY,
        mlServiceUrl: process.env.ML_SERVICE_URL
    }
};

module.exports = config;