const mongoose = require('mongoose');

const pestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    scientificName: {
        type: String,
        required: true
    },
    commonNames: [String],
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['insect', 'mite', 'nematode', 'rodent', 'bird', 'other'],
        required: true
    },
    affectedCrops: [{
        type: String,
        required: true
    }],
    lifecycle: {
        egg: String,
        larva: String,
        pupa: String,
        adult: String,
        totalDuration: String
    },
    identification: {
        eggs: String,
        larva: String,
        pupa: String,
        adult: String,
        damage: String
    },
    symptoms: [String],
    damageType: {
        type: String,
        enum: ['chewing', 'sucking', 'boring', 'mining', 'galling', 'root_feeding']
    },
    economicThreshold: String,
    seasonality: {
        peakMonths: [String],
        favorableConditions: [String]
    },
    management: {
        cultural: [String],
        biological: [String],
        chemical: [{
            name: String,
            activeIngredient: String,
            dosage: String,
            application: String,
            timing: String
        }],
        integrated: [String]
    },
    geographicDistribution: [String],
    severity: {
        type: String,
        enum: ['low', 'moderate', 'high', 'very_high'],
        default: 'moderate'
    },
    images: [String],
    references: [String]
}, {
    timestamps: true
});

// Index for better search performance
pestSchema.index({ name: 'text', scientificName: 'text', description: 'text' });
pestSchema.index({ affectedCrops: 1 });
pestSchema.index({ type: 1, severity: 1 });

module.exports = mongoose.model('Pest', pestSchema);