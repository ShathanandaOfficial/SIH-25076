const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
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
    category: {
        type: String,
        enum: ['cereal', 'pulse', 'oilseed', 'vegetable', 'fruit', 'spice', 'fiber', 'cash_crop', 'fodder'],
        required: true
    },
    family: String,
    description: String,
    varieties: [{
        name: String,
        characteristics: String,
        duration: String,
        yield: String,
        resistance: [String]
    }],
    cultivation: {
        season: {
            type: String,
            enum: ['kharif', 'rabi', 'zaid', 'perennial', 'all_season']
        },
        climateRequirements: {
            temperature: {
                minimum: Number,
                optimum: Number,
                maximum: Number
            },
            rainfall: {
                minimum: Number,
                optimum: Number,
                maximum: Number
            },
            humidity: String,
            sunlight: String
        },
        soilRequirements: {
            type: [String],
            pH: {
                minimum: Number,
                optimum: Number,
                maximum: Number
            },
            drainage: String,
            fertility: String
        },
        waterRequirements: {
            type: String,
            enum: ['low', 'moderate', 'high', 'very_high']
        }
    },
    plantingGuide: {
        seedRate: String,
        spacing: {
            rowToRow: String,
            plantToPlant: String
        },
        depth: String,
        method: String,
        bestTime: String,
        nurseryPeriod: String
    },
    careInstructions: {
        irrigation: {
            frequency: String,
            method: String,
            criticalStages: [String]
        },
        fertilization: {
            basal: String,
            topdressing: [String],
            organic: String,
            micronutrients: String
        },
        weeding: {
            timing: [String],
            method: String
        },
        pestManagement: [String],
        diseaseManagement: [String]
    },
    growthStages: [{
        stage: String,
        duration: String,
        description: String,
        management: [String]
    }],
    harvest: {
        duration: String,
        maturitySigns: [String],
        method: String,
        timing: String,
        expectedYield: String,
        postHarvest: [String]
    },
    nutritionalValue: {
        protein: String,
        carbohydrates: String,
        fat: String,
        fiber: String,
        vitamins: [String],
        minerals: [String]
    },
    economicAspects: {
        marketPrice: String,
        demandTrends: String,
        exportPotential: String,
        processingValue: String
    },
    sustainabilityFactor: {
        waterEfficiency: String,
        carbonFootprint: String,
        soilHealth: String,
        biodiversity: String
    },
    geographicSuitability: [String],
    commonProblems: [{
        problem: String,
        cause: String,
        solution: String
    }],
    images: [String],
    references: [String]
}, {
    timestamps: true
});

// Index for better search performance
cropSchema.index({ name: 'text', scientificName: 'text', description: 'text' });
cropSchema.index({ category: 1 });
cropSchema.index({ 'cultivation.season': 1 });
cropSchema.index({ geographicSuitability: 1 });

module.exports = mongoose.model('Crop', cropSchema);