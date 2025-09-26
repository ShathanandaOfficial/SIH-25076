const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    queryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Query',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    },
    feedbackType: {
        type: String,
        enum: ['response_quality', 'timeliness', 'helpfulness', 'accuracy', 'general'],
        required: true
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
    tags: [String],
    helpful: {
        type: Boolean,
        default: null
    }
}, {
    timestamps: true
});

// Index for better query performance
feedbackSchema.index({ queryId: 1 });
feedbackSchema.index({ userId: 1, createdAt: -1 });
feedbackSchema.index({ rating: 1 });

// Compound index for analytics
feedbackSchema.index({ feedbackType: 1, rating: 1, createdAt: -1 });

module.exports = mongoose.model('Feedback', feedbackSchema);