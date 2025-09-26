const cron = require('node-cron');
const Query = require('../models/query');
const User = require('../models/user');
const Logger = require('../utils/logger');

class NotificationJob {
    // Run every hour to check for queries that need attention
    static start() {
        cron.schedule('0 * * * *', async () => {
            try {
                Logger.info('Starting notification job');
                
                await this.checkOverdueQueries();
                await this.checkHighPriorityQueries();
                
                Logger.info('Notification job completed');
            } catch (error) {
                Logger.error('Error in notification job', error);
            }
        });
        
        Logger.info('Notification job scheduled');
    }
    
    // Check for queries that are overdue (pending for more than 24 hours)
    static async checkOverdueQueries() {
        try {
            const oneDayAgo = new Date();
            oneDayAgo.setHours(oneDayAgo.getHours() - 24);
            
            const overdueQueries = await Query.find({
                status: 'pending',
                createdAt: { $lt: oneDayAgo }
            }).populate('userId', 'name email');
            
            Logger.info(`Found ${overdueQueries.length} overdue queries`);
            
            // Here you would implement notification logic
            // e.g., send emails, push notifications, etc.
            for (const query of overdueQueries) {
                Logger.warn('Overdue query found', {
                    queryId: query._id,
                    userId: query.userId._id,
                    createdAt: query.createdAt
                });
                
                // TODO: Send notification to officers
            }
        } catch (error) {
            Logger.error('Error checking overdue queries', error);
        }
    }
    
    // Check for high priority queries that need immediate attention
    static async checkHighPriorityQueries() {
        try {
            const highPriorityQueries = await Query.find({
                status: 'pending',
                priority: { $in: ['high', 'urgent'] }
            }).populate('userId', 'name email');
            
            Logger.info(`Found ${highPriorityQueries.length} high priority queries`);
            
            // Notify available officers about high priority queries
            for (const query of highPriorityQueries) {
                Logger.info('High priority query needs attention', {
                    queryId: query._id,
                    priority: query.priority,
                    userId: query.userId._id
                });
                
                // TODO: Send immediate notification to officers
            }
        } catch (error) {
            Logger.error('Error checking high priority queries', error);
        }
    }
}

module.exports = NotificationJob;