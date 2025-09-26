const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    queryText: {
        type: String,
        required: true
    },
    queryType: {
        type: String,
        enum: ['crop_advisory', 'pest_control', 'weather', 'fertilizer', 'general'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'resolved', 'escalated'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    response: {
        type: String
    },
    responseBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    escalatedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [String],
    location: {
        latitude: Number,
        longitude: Number,
        address: String
    }
}, {
    timestamps: true
});

// Index for better query performance
querySchema.index({ userId: 1, createdAt: -1 });
querySchema.index({ status: 1, priority: 1 });

module.exports = mongoose.model('Query', querySchema);