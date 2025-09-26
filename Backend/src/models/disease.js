const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
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
    pathogenType: {
        type: String,
        enum: ['fungal', 'bacterial', 'viral', 'nematode', 'phytoplasma', 'abiotic'],
        required: true
    },
    affectedCrops: [{
        type: String,
        required: true
    }],
    pathogen: {
        genus: String,
        species: String,
        strain: String,
        characteristics: String
    },
    symptoms: {
        leaves: String,
        stem: String,
        roots: String,
        fruits: String,
        flowers: String,
        generalSymptoms: [String]
    },
    lifecycle: {
        primaryInoculum: String,
        secondarySpread: String,
        survivalMechanism: String,
        favorableConditions: [String]
    },
    epidemiology: {
        temperature: {
            minimum: Number,
            optimum: Number,
            maximum: Number
        },
        humidity: {
            minimum: Number,
            optimum: Number
        },
        wetnessPeriod: String,
        windRole: String
    },
    diagnosis: {
        fieldSymptoms: [String],
        laboratoryTests: [String],
        differentialSymptoms: String
    },
    management: {
        cultural: [String],
        biological: [{
            agent: String,
            application: String,
            timing: String
        }],
        chemical: [{
            name: String,
            activeIngredient: String,
            dosage: String,
            application: String,
            timing: String,
            phi: Number // Pre-harvest interval
        }],
        integrated: [String],
        resistance: {
            varieties: [String],
            genes: [String]
        }
    },
    economicImpact: {
        yieldLoss: String,
        qualityImpact: String,
        geographicImportance: [String]
    },
    prevention: [String],
    severity: {
        type: String,
        enum: ['low', 'moderate', 'high', 'very_high'],
        default: 'moderate'
    },
    seasonality: {
        peakMonths: [String],
        climateFactors: [String]
    },
    geographicDistribution: [String],
    images: [String],
    references: [String]
}, {
    timestamps: true
});

// Index for better search performance
diseaseSchema.index({ name: 'text', scientificName: 'text', description: 'text' });
diseaseSchema.index({ affectedCrops: 1 });
diseaseSchema.index({ pathogenType: 1, severity: 1 });
diseaseSchema.index({ 'symptoms.generalSymptoms': 1 });

module.exports = mongoose.model('Disease', diseaseSchema);