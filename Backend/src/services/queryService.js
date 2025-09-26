const Query = require('../models/query');
const Image = require('../models/image');
const Logger = require('../utils/logger');

class QueryService {
    // Create new query
    static async createQuery(queryData) {
        try {
            const query = new Query(queryData);
            await query.save();
            
            Logger.info('Query created successfully', { queryId: query._id });
            
            return await this.getQueryById(query._id);
        } catch (error) {
            Logger.error('Error creating query', error);
            throw error;
        }
    }

    // Get query by ID
    static async getQueryById(queryId) {
        try {
            const query = await Query.findById(queryId)
                .populate('userId', 'name email profile')
                .populate('responseBy', 'name email')
                .populate('images')
                .populate('escalatedTo', 'name email');

            if (!query) {
                throw new Error('Query not found');
            }

            return query;
        } catch (error) {
            Logger.error('Error getting query by ID', error);
            throw error;
        }
    }

    // Get queries by user
    static async getQueriesByUser(userId, options = {}) {
        try {
            const { page = 0, limit = 10, status, queryType } = options;
            
            const filter = { userId };
            if (status) filter.status = status;
            if (queryType) filter.queryType = queryType;

            const queries = await Query.find(filter)
                .populate('responseBy', 'name email')
                .populate('images')
                .sort({ createdAt: -1 })
                .skip(page * limit)
                .limit(limit);

            const total = await Query.countDocuments(filter);

            return {
                queries,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            Logger.error('Error getting queries by user', error);
            throw error;
        }
    }

    // Update query status
    static async updateQueryStatus(queryId, status, userId, response = null) {
        try {
            const updateData = { status };
            if (response) {
                updateData.response = response;
                updateData.responseBy = userId;
            }

            const query = await Query.findByIdAndUpdate(
                queryId,
                updateData,
                { new: true, runValidators: true }
            ).populate('userId', 'name email')
             .populate('responseBy', 'name email');

            if (!query) {
                throw new Error('Query not found');
            }

            Logger.info('Query status updated', { queryId, status });

            return query;
        } catch (error) {
            Logger.error('Error updating query status', error);
            throw error;
        }
    }

    // Escalate query
    static async escalateQuery(queryId, escalatedTo, reason) {
        try {
            const query = await Query.findByIdAndUpdate(
                queryId,
                {
                    status: 'escalated',
                    escalatedTo,
                    escalationReason: reason
                },
                { new: true, runValidators: true }
            ).populate('userId', 'name email')
             .populate('escalatedTo', 'name email');

            if (!query) {
                throw new Error('Query not found');
            }

            Logger.info('Query escalated', { queryId, escalatedTo });

            return query;
        } catch (error) {
            Logger.error('Error escalating query', error);
            throw error;
        }
    }

    // Get pending queries for officers
    static async getPendingQueries(options = {}) {
        try {
            const { page = 0, limit = 10, priority } = options;
            
            const filter = { status: { $in: ['pending', 'in_progress'] } };
            if (priority) filter.priority = priority;

            const queries = await Query.find(filter)
                .populate('userId', 'name email profile')
                .populate('images')
                .sort({ priority: 1, createdAt: 1 }) // High priority first, then FIFO
                .skip(page * limit)
                .limit(limit);

            const total = await Query.countDocuments(filter);

            return {
                queries,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            Logger.error('Error getting pending queries', error);
            throw error;
        }
    }
}

module.exports = QueryService;