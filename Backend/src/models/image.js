const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    queryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Query'
    },
    analysisResult: {
        detectedObjects: [String],
        confidence: Number,
        recommendations: [String],
        processed: {
            type: Boolean,
            default: false
        }
    },
    metadata: {
        cropType: String,
        disease: String,
        severity: String,
        location: {
            latitude: Number,
            longitude: Number
        }
    }
}, {
    timestamps: true
});

// Index for better query performance
imageSchema.index({ uploadedBy: 1, createdAt: -1 });
imageSchema.index({ queryId: 1 });

module.exports = mongoose.model('Image', imageSchema);