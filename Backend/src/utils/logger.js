const fs = require('fs');
const path = require('path');

// Logger utility
class Logger {
    static log(level, message, meta = {}) {
        const timestamp = new Date().toISOString();
        const logData = {
            timestamp,
            level,
            message,
            ...meta
        };

        console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, meta);

        // In production, you might want to write to files or external logging service
        if (process.env.NODE_ENV === 'production') {
            this.writeToFile(logData);
        }
    }

    static info(message, meta = {}) {
        this.log('info', message, meta);
    }

    static error(message, error = null, meta = {}) {
        const errorMeta = error ? {
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name
            },
            ...meta
        } : meta;

        this.log('error', message, errorMeta);
    }

    static warn(message, meta = {}) {
        this.log('warn', message, meta);
    }

    static debug(message, meta = {}) {
        if (process.env.NODE_ENV === 'development') {
            this.log('debug', message, meta);
        }
    }

    static writeToFile(logData) {
        const logDir = path.join(process.cwd(), 'logs');
        const logFile = path.join(logDir, `app-${new Date().toISOString().split('T')[0]}.log`);

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        fs.appendFileSync(logFile, JSON.stringify(logData) + '\n');
    }
}

module.exports = Logger;