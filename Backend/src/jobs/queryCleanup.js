const cron = require('node-cron');
const Query = require('../models/query');
const Logger = require('../utils/logger');

class QueryCleanupJob {
    // Run daily at 2 AM to clean up old resolved queries
    static start() {
        cron.schedule('0 2 * * *', async () => {
            try {
                Logger.info('Starting query cleanup job');
                
                // Delete queries older than 6 months and resolved
                const sixMonthsAgo = new Date();
                sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                
                const result = await Query.deleteMany({
                    status: 'resolved',
                    createdAt: { $lt: sixMonthsAgo }
                });
                
                Logger.info(`Query cleanup completed. Deleted ${result.deletedCount} old queries`);
            } catch (error) {
                Logger.error('Error in query cleanup job', error);
            }
        });
        
        Logger.info('Query cleanup job scheduled');
    }
}

module.exports = QueryCleanupJob;